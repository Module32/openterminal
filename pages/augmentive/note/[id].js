import Tiptap from "../../../components/Tiptap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShare,
  faXmark,
  faClipboard,
  faArrowLeft,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Redirect from "../../../components/Redirect";
import { connectToDatabase } from "../../../util/db";
import Custom404 from "../../404.js";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import fetch from 'node-fetch';

export default function Note({ dbuser, dbnote }) {
  const [title, setTitle] = useState(dbnote ? dbnote.title : "Untitled");
  const [star, setStar] = useState(dbnote ? dbnote.starred : false);
  const [shareModal, setShareModal] = useState(false);
  const [editability, setEditability] = useState(
    dbnote ? dbnote.editability : "view"
  );
  const [viewability, setViewability] = useState(
    dbnote ? dbnote.viewability : "private"
  );
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession({ required: true });
  const [note, setNote] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (session && dbnote === null && id === "new") {
      const body = {
        owner: session.user.email,
        apitoken: process.env.NEXT_PUBLIC_API_TOKEN
      }
      fetch("https://openterminal.vercel.app/api/augmentive/note", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*'
        },
      })
        .then(res => res.json()).then(data => setNote(data.note))
        .catch(err => console.log(`error: ${err}`));
    } else if (dbnote) setNote(dbnote);
  }, [session]);
  
  if (dbnote === null && id !== "new") return <Custom404 />;
  if (!session && status === "unauthenticated") {
    return <Redirect text="OT login" link="/login"></Redirect>;
  }

  const onTitleChange = async (value) => {
    if (session.user.email !== note.owner) return;
    setTitle(value);
    fetch("https://openterminal.vercel.app/api/augmentive/note", {
      method: "PUT",
      body: JSON.stringify({
        id: note._id,
        updateDoc: { title: value },
      }),
      headers: {
        "Content-type": "application/json",
        'apitoken': apitoken,
      },
    }).then((res) => {
      if (!res.ok) {
        setTitle("Couldn't update title");
      }
    });
  };

  const onStar = async () => {
    setStar(!star);
    fetch("https://openterminal.vercel.app/api/augmentive/note", {
      method: "PUT",
      body: JSON.stringify({
        id: note._id,
        updateDoc: { starred: !star },
      }),
      headers: {
        "Content-type": "application/json",
        'apitoken': apitoken,
      },
    }).then((res) => {
      if (!res.ok) {
        setTitle("Couldn't update title");
      }
    });
  };

  const checkSharePerms = () => {
    const button = (
      <Tippy
        content={<p>Share with others</p>}
        className="backdrop-blur-md bg-slate-200/80 p-1 px-2 font-medium shadow-xl border border-slate-400/75 rounded"
      >
        <button
          className="text-gray-dark hover:text-gray p-0 m-0 mx-1.5 bg-transparent hover:bg-transparent border-none"
          onClick={() => setShareModal(true)}
        >
          <FontAwesomeIcon icon={faShare} />
        </button>
      </Tippy>
    );
    if (session && note) {
      if (session.user === note.owner) return button;
      if (session.user.email === note.owner) return button;
      return null;
    }
  };

  const editabilityArray = ["Edit", "View", "Comment"];
  const viewabilityArray = ["Public", "Private"];

  return (
    <>
      <div className="flex pt-3 pb-2 px-5 bg-white font-medium">
        <span className="flex items-center">
          <Link href="/augmentive/dashboard">
            <a>
              <FontAwesomeIcon icon={faArrowLeft} className="text-gray mr-2" />
            </a>
          </Link>{" "}
          <span className={title === "Couldn't update title" && "text-red-500"}>
            <input
              className="p-0 border-0 m-0 hover:border-0 focus:border-0 focus:shadow-none"
              onChange={(e) => onTitleChange(e.target.value)}
              value={title}
            ></input>
          </span>
        </span>
        <div className="ml-auto mr-1">
          <Tippy
            content={
              <p>{star === true ? "Unstar this note" : "Star this note"}</p>
            }
            className="backdrop-blur-md bg-slate-200/80 p-1 px-2 font-medium shadow-xl border border-slate-400/75 rounded"
          >
            <button
              className={`${
                star === false
                  ? "text-gray-dark hover:text-gray"
                  : "text-amber-500"
              } p-0 m-0 mx-1.5 bg-transparent hover:bg-transparent border-none`}
              onClick={() => onStar()}
            >
              <FontAwesomeIcon icon={faStar} />
            </button>
          </Tippy>
          {checkSharePerms()}
        </div>
      </div>

      <div className="bg-white">
        <Tiptap
          content={`Write something!`}
          formattingClass="mx-2"
          propsClass="min-h-screen"
          user={session && session.user.name}
        />
      </div>

      {shareModal === true && (
        <div className="fixed flex h-screen top-0 m-0 rounded-none hover:bg-black/30 w-screen bg-black/30 items-center justify-center cursor-default">
          <div
            className={`bg-sky-400 font-medium lg:w-5/12 md:w-7/12 sm:w-10/12 ${
              isMobile && "w-11/12"
            } rounded border border-slate-400`}
          >
            <div className="py-2 px-5 text-white text-left">
              <h1 className="text-3xl font-semibold flex items-center">
                Share your note{" "}
                <button
                  className="ml-auto p-1 px-3 bg-sky-500 text-2xl border-none hover:bg-sky-600/50 text-white"
                  onClick={() => setShareModal(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </h1>
            </div>
            <div className="p-5 bg-slate-100">
              <p className="text-xl">Invite specific users...</p>
              <input
                className="w-full p-1.5 px-2 ml-0"
                type="email"
                placeholder="Search by email, press Enter to add"
              ></input>
              <hr className="my-3" />
              <p className="text-xl">...Or share globally</p>
              <p className="text-xl flex items-center">
                {viewabilityArray.map((option) => (
                  <button
                    key={option}
                    className={`flex-1 ml-0 py-1 border border-solid border-slate-300 rounded ${
                      viewability === option.toLowerCase()
                        ? "bg-sky-500/75 hover:bg-sky-500/60 border-transparent"
                        : "bg-transparent hover:bg-transparent text-black"
                    }`}
                    onClick={() => setViewability(option.toLowerCase())}
                  >
                    {option}
                  </button>
                ))}
              </p>
              <p
                className={`text-xl flex items-center ${
                  viewability === "private" && "text-gray-light"
                }`}
              >
                {editabilityArray.map((mode) => (
                  <button
                    key={mode}
                    className={`flex-1 ml-0 py-1 border border-solid border-slate-300 rounded ${
                      editability === mode.toLowerCase()
                        ? viewability === "public"
                          ? "bg-sky-500/75 hover:bg-sky-500/60 border-transparent"
                          : "bg-sky-500/50 hover:bg-sky-500/50 border-transparent"
                        : "bg-transparent hover:bg-transparent disabled:bg-slate-300/20 text-black disabled:text-gray/75"
                    }`}
                    onClick={() => setEditability(mode.toLowerCase())}
                    disabled={viewability === "private" ? true : false}
                  >
                    {mode}
                  </button>
                ))}
              </p>
              <hr className="my-3" />
              <button
                className="m-0 mt-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 border border-solid border-sky-400 active:bg-sky-500/40 rounded w-[99%]"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `openterminal.vercel.app/augmentive/note/${note._id}`
                  )
                }
              >
                <FontAwesomeIcon icon={faLink} /> Copy link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();
  let dbnote;
  let dbuser;

  const routeid = context.params.id;

  const collection = client.db("Genopi").collection("notes");

  if (ObjectId.isValid(routeid) === true) {
    const note = await collection.findOne({ _id: ObjectId(routeid) });
    if (!note || note === null) {
      dbnote = null;
    } else dbnote = note;
  } else dbnote = null;

  return {
    props: {
      dbnote: JSON.parse(JSON.stringify(dbnote)),
    },
  };
}

Note.auth = true;
