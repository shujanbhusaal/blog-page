'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getBlogs, saveBlog, deleteBlog, updateBlog, isAuthenticated, setAuth, initDummyBlogs } from '@/lib/storage'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    } else {
      initDummyBlogs()
      setBlogs(getBlogs())
    }
  }, [])

  const handleAddOrUpdateBlog = () => {
    if (editingId) {
      const updated = { id: editingId, title, description, image }
      updateBlog(updated)
      setEditingId(null)
    } else {
      const newBlog = { id: crypto.randomUUID(), title, description, image }
      saveBlog(newBlog)
    }
    setTitle('')
    setDescription('')
    setImage('')
    setBlogs(getBlogs())
  }

  const handleEdit = (blog) => {
    setEditingId(blog.id)
    setTitle(blog.title)
    setDescription(blog.description)
    setImage(blog.image)
  }

  const handleDelete = (id) => {
    deleteBlog(id)
    setBlogs(getBlogs())
  }

  const handleLogout = () => {
    setAuth(false)
    router.push('/login')
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Blogs</h2>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
      <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="input" placeholder="Image Path" value={image} onChange={(e) => setImage(e.target.value)} />
      <button className="btn my-2" onClick={handleAddOrUpdateBlog}>{editingId ? 'Update' : 'Add'} Blog</button>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 border rounded-lg">
            <img src={blog.image} alt="" className="w-full h-40 object-cover mb-2" />
            <h3 className="font-bold text-lg">{blog.title}</h3>
            <p>{blog.description}</p>
            <div className="flex gap-2 mt-2">
              <button className="btn" onClick={() => handleEdit(blog)}>Edit</button>
              <button className="btn" onClick={() => handleDelete(blog.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
