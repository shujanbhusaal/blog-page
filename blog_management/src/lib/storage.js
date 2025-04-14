
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
  const newBlog = { ...blog, id: Date.now() }; 
  localStorage.setItem("blogs", JSON.stringify([...existing, newBlog]));
};


export const updateBlog = (updatedBlog) => {
  const blogs = getBlogs();
  const updatedBlogs = blogs.map((b) => {
    const storedId = typeof b.id === "number" ? b.id : Number(b.id);
    const updateId = typeof updatedBlog.id === "number" ? updatedBlog.id : Number(updatedBlog.id);
    return storedId === updateId ? updatedBlog : b;
  });
  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
};

export const deleteBlog = (id) => {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const updatedBlogs = blogs.filter(blog => blog.id !== id);
  localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
};


export const blogDummy = [
  {
    title: "Exploring the Future of AI",
    description:
      "A deep dive into how artificial intelligence is shaping the world, from everyday apps to futuristic concepts.",
    sampleImage: "https://media.licdn.com/dms/image/v2/D5612AQFKPcqEmLH-5A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1712561293388?e=1750291200&v=beta&t=_ORyF1wDQBJ5ax5iaNVYLTn-8GlV8P21j4YaDPFvrY8",
  },
  {
    title: "Top 10 Travel Destinations in 2025",
    description:
      "Discover the most breathtaking places to visit this year, including hidden gems and popular hotspots.",
    sampleImage: "https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2023/06/Elephants-of-Chitwan-min.jpg?w=1200&ssl=1",
  },
  {
    title: "The Ultimate Guide to Healthy Eating",
    description:
      "Everything you need to know about nutrition, meal planning, and building better eating habits.",
    sampleImage: "https://foodaddy.co.uk/wp-content/uploads/2023/05/pexels-janetrangdoan-1092730.jpg",
  },
  {
    title: "Mastering JavaScript in 30 Days",
    description:
      "A beginner-friendly roadmap to learning JavaScript, including daily tasks and helpful resources.",
    sampleImage: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*sW_fIK4OGhdxjRTxIWHjXw.png",
  },
  {
    title: "Home Office Setup for Productivity",
    description:
      "Tips and tools to design a workspace that boosts focus and minimizes distractions.",
    sampleImage: "https://www.pfu-us.ricoh.com/-/media/project/scanners/blog/2023/05/best_home_office_1440w.jpg?mw=1440&w=1440&hash=CAFDE6DD783A0F92F8CC7E8B2A6B15E6",
  },
];



export const setAuth = (isLoggedIn) => {
  localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
};

export const isAuthenticated = () => {
  return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
};
