export const getUsers = () => {
    try {
      const stored = localStorage.getItem('users');
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  

export const saveUser = (user) => {
    const users = getUsers();
    localStorage.setItem('users', JSON.stringify([...users, user]));
  };





  export const getBlogs = () => {
    return JSON.parse(localStorage.getItem('blogs') || '[]');
  };
  
  export const saveBlog = (blog) => {
    const blogs = getBlogs();
    localStorage.setItem('blogs', JSON.stringify([blog, ...blogs]));
  };
  
  export const updateBlog = (updatedBlog) => {
    const blogs = getBlogs().map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
    localStorage.setItem('blogs', JSON.stringify(blogs));
  };
  
  export const deleteBlog = (id) => {
    const blogs = getBlogs().filter((b) => b.id !== id);
    localStorage.setItem('blogs', JSON.stringify(blogs));
  };
  
  export const initDummyBlogs = () => {
    if (!localStorage.getItem('blogs')) {
      const dummyBlogs = [...Array(5)].map((_, i) => ({
        id: `dummy-${i}`,
        title: `Sample Blog ${i + 1}`,
        description: 'This is a sample blog post.',
        image: '/sample.jpg',
      }));
      localStorage.setItem('blogs', JSON.stringify(dummyBlogs));
    }
  };
  
  export const setAuth = (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  };
  
  export const isAuthenticated = () => {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  };