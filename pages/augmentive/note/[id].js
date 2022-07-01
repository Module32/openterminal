import Tiptap from '../../../components/Tiptap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faShare, faXmark, faClipboard, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useSession, getSession } from "next-auth/react"
import React, { useState } from 'react';
import Redirect from '../../../components/Redirect'
import { connectToDatabase } from "../../../util/db";
import Custom404 from '../../404.js'
import { ObjectId } from 'mongodb'

export default function Project({ genouser, dbnote }) {
    const [ title, setTitle ] = useState(dbnote.title || 'Untitled');
    const [ star, setStar ] = useState(false);
    const [ shareModal, setShareModal ] = useState(false);
    const [ editability, setEditability ] = useState('edit');
    const [ viewability, setViewability ] = useState('public');

    const { data: session, status } = useSession({
      required: true
    })
    
    if (!session) { return <Redirect text='OT login' link='/login'></Redirect> }

    if (dbnote === 'Note does not exist') return <Custom404 />

    if (title.length === 0) setTitle('Untitled')

    let token = process.env.API_TOKEN

    const onTitleChange = async (value) => {
      setTitle(value);
      const res = await fetch('http://openterminal.vercel.app/api/augmentive/note', {
        method: 'PUT',
        body: JSON.stringify({
          id: dbnote._id,
          updateDoc: { title: value }
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'apitoken': token
        }
      });
      if (!res.ok) {
        setTitle("Couldn't update title")
      }
    }

    const editabilityArray = [ 'Edit', 'View', 'Comment' ];
    const viewabilityArray = [ 'Public', 'Private' ]

    return (
      <>
          <div className='flex pt-3 pb-2 px-5 bg-white font-medium'>
            <span className='flex items-center'><Link href='/augmentive/dashboard'><a><FontAwesomeIcon icon={faArrowLeft} className='text-gray mr-2' /></a></Link> <span className={title === "Couldn't update title" && 'text-red-500'}><input className='p-0 border-0 m-0 hover:border-0 focus:border-0 focus:shadow-none' onChange={(e) => onTitleChange(e.target.value)} value={title}></input></span></span>
            <div className='ml-auto mr-1'>
              <button className={`${star === false ? 'text-gray-dark hover:text-gray' : 'text-amber-500'} p-0 m-0 mx-1.5 bg-transparent hover:bg-transparent border-none`} onClick={() => star === false ? setStar(true) : setStar(false) }><FontAwesomeIcon icon={faStar} /></button>
              <button className='text-gray-dark hover:text-gray p-0 m-0 mx-1.5 bg-transparent hover:bg-transparent border-none' onClick={() => setShareModal(true)}><FontAwesomeIcon icon={faShare} /></button>
            </div>
          </div>

          <div className='bg-white'>
            <Tiptap content={`Write something!`} formattingClass='mx-2' propsClass='min-h-screen' user={session.user.name} />
          </div>
          

          {shareModal === true && <div className='fixed flex h-screen top-0 m-0 rounded-none hover:bg-black/30 w-screen bg-black/30 items-center justify-center cursor-default'>
              <div className='bg-slate-300 font-medium w-4/12 rounded border border-slate-400'>
                <div className='p-5 text-left'>
                  <h1 className='text-3xl font-semibold flex'>Share {title} <span className='ml-auto mt-[-17px]'><button className='m-0 p-0 text-base bg-transparent border-none hover:bg-transparent text-slate-400 hover:text-slate-500' onClick={() => setShareModal(false)}><FontAwesomeIcon icon={faXmark} /></button></span></h1>
                </div>
                <div className='p-5 bg-slate-100'>
                  <p className='text-gray'>Options</p>
                  <p className='text-xl flex items-center'><span className='mr-2'>Make this note</span> {viewabilityArray.map(option =>
                  <button
                    key={option}
                    className={`flex-1 ml-0 py-1 border-none rounded ${viewability === option.toLowerCase() ? 'bg-amber-500/75 hover:bg-amber-500/60' : 'bg-slate-400 hover:bg-slate-400/75'}`}
                    onClick={() => setViewability(option.toLowerCase())}>{option}</button>
                  )}</p>
                  <p className={`text-xl flex items-center ${viewability === 'private' && 'text-gray-light'}`}><span className='mr-2'>Allow viewers to</span> {editabilityArray.map(mode =>
                  <button
                    key={mode}
                    className={`flex-1 ml-0 py-1 border-none rounded ${editability === mode.toLowerCase() ? viewability === 'public' ? 'bg-amber-500/75 hover:bg-amber-500/60' : 'bg-amber-500/50 hover:bg-amber-500/50' : 'bg-slate-400 hover:bg-slate-400/75 disabled:bg-slate-300'}`}
                    onClick={() => setEditability(mode.toLowerCase())} disabled={viewability === 'private' ? true : false}>{mode}</button>
                  )}</p>
                  <p className='text-gray mt-1'>Advanced</p>
                  <p className='text-xl'>Invite users</p>
                  {viewability === 'private' && <p className='text-gray text-base leading-tight'>These users will be able to see your private note.</p>}
                  <input className='w-full p-2 py-1 ml-0 bg-slate-300/30' type='email' placeholder='Search by email, press Enter to add'></input>
                </div>
                <div className='px-0 bg-slate-300 text-center rounded-b'>
                  <button className={`flex border-none w-full overflow-scroll ml-0 rounded-none bg-transparent group active:text-green text-black hover:bg-transparent hover:text-gray`} onClick={() => navigator.clipboard.writeText(`openterminal.vercel.app/augmentive/note/${dbnote._id}`)}><FontAwesomeIcon icon={faClipboard} className='text-gray mt-[1px] mr-1 group-active:text-green' /> openterminal.vercel.app/augmentive/note/{dbnote._id}</button>
                </div>
              </div>
          </div> }
      </>
    )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();
  const session = await getSession(context);
  let genouser;
  let dbnote;
  if (!session) return {
      props: {
        genouser: null,
        dbnote: null
      },
  };

  const routeid = context.params.id;

  const db = client.db('Genopi');
  await db.collection('users').findOne({ email: session['user']['email'] }).then(function(user) {
      genouser = user
  })

  if (ObjectId.isValid(routeid) === false && routeid !== 'new') {
    return {
      props: {
        genouser: JSON.parse(JSON.stringify(genouser)),
        dbnote: 'Note does not exist'
      }
    }
  } else if (ObjectId.isValid(routeid) === false && routeid === 'new') {
    await db.collection('notes').findOne({ title: 'Untitled', content: 'Write something!', owner: session['user']['email'] }).then(async function(note) {
      if (!note || note === null) {
        const newNote = await db.collection('notes').insertOne({
          title: 'Untitled',
          owner: session.user.name,
          date: new Date().now(),
          editability: 'edit',
          viewability: 'private',
          bgcolor: 'bg-white',
          invUsers: [],
          content: 'Write something!'
        });
        await db.collection('users').updateOne({ email: session.user.email }, { $addToSet: { 'owned': { id: newNote._id } } }, function(err, res) {
          if (err) throw err;
        })
        dbnote = newNote;
      } else dbnote = note;
    });
  } else if (ObjectId.isValid(routeid) === true && routeid !== 'new') {
    await db.collection('notes').findOne({ _id: ObjectId(routeid) }).then(async function(note) {
      if (!note || note === null) {
        return dbnote = 'Note does not exist'
      } else dbnote = note;
    })
  };
  
  return {
      props: {
        genouser: JSON.parse(JSON.stringify(genouser)),
        dbnote: JSON.parse(JSON.stringify(dbnote))
      },
  };
}