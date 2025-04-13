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
    try {
      const storedBlogs = localStorage.getItem('blogs');
      const parsedBlogs = JSON.parse(storedBlogs);
      return Array.isArray(parsedBlogs) ? parsedBlogs : [];
    } catch {
      return [];
    }
  };
  
 
  
  


  export const saveBlog = (blog) => {
    const existing = JSON.parse(localStorage.getItem("blogs") || "[]");
    localStorage.setItem("blogs", JSON.stringify([...existing, blog]));
  };

  
  export const updateBlog = (updatedBlog) => {
    const blogs = getBlogs().map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
    localStorage.setItem('blogs', JSON.stringify(blogs));
  };
  
 
  

  export const deleteBlog = (index) => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || []
    blogs.splice(index, 1)
    localStorage.setItem('blogs', JSON.stringify(blogs))
    
  }
  

  export const blogDummy = [
    {
      title: "Exploring the Future of AI",
      description: "A deep dive into how artificial intelligence is shaping the world, from everyday apps to futuristic concepts.",
      sampleImage: "https://via.placeholder.com/600x400?text=AI+Future"
    },
    {
      title: "Top 10 Travel Destinations in 2025",
      description: "Discover the most breathtaking places to visit this year, including hidden gems and popular hotspots.",
      sampleImage: "https://via.placeholder.com/600x400?text=Travel+2025"
    },
    {
      title: "The Ultimate Guide to Healthy Eating",
      description: "Everything you need to know about nutrition, meal planning, and building better eating habits.",
      sampleImage: "https://via.placeholder.com/600x400?text=Healthy+Eating"
    },
    {
      title: "Mastering JavaScript in 30 Days",
      description: "A beginner-friendly roadmap to learning JavaScript, including daily tasks and helpful resources.",
      sampleImage: "https://via.placeholder.com/600x400?text=Learn+JavaScript"
    },
    {
      title: "Home Office Setup for Productivity",
      description: "Tips and tools to design a workspace that boosts focus and minimizes distractions.",
      sampleImage: "https://via.placeholder.com/600x400?text=Home+Office"
    }
  ];
  


  
   

  
  export const setAuth = (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  };
  
  export const isAuthenticated = () => {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  };