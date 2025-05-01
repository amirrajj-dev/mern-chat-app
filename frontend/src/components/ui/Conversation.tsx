import React from 'react'

const Conversation = () => {
    const [isOnline, setIsOnline] = React.useState(false)
  return (
   <div className='flex flex-col'>
     <div className='flex items-center justify-between p-2 rounded-md'>
        <div className='flex items-center gap-2'>
            <div className='relative'>
                <img src="https://avatar.iran.liara.run/public/boy?username=ali" className='size-10 rounded-full' alt="ali pic" />
                {/* online indicator  */}
                <span className='size-2 rounded-full absolute top-0 right-0 bg-emerald-500 ring ring-emerald-100'></span>
            </div>
            <span>John Doe</span>
        </div>
        <div>👺</div>
    </div>
    <div className="divider mt-1"></div>
   </div>
  )
}

export default Conversation