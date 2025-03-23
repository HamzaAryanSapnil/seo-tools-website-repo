import CreateToolsForm from '@/components/CreateToolPage'

const CreateNewToolPage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-start items-center w-full' >
      <h1 className='font-bold text-3xl my-10' >Create New Tool</h1>
      <CreateToolsForm/>
    </div>
  )
}

export default CreateNewToolPage
