import { useEffect, useState } from "react";
import News from "./components/News";
import Blogs from "./components/Blogs";

function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  }, []);

  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlogs) => {
      const updateBlogs = isEdit
        ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updateBlogs));
      return updateBlogs;
    });
    setIsEditing(false);
    setSelectPost(null);
  };

  const handleDeletePost=(postToDelete)=>{
    setBlogs((prevBlogs)=>{
      const updatedBlogs=prevBlogs.filter((blog)=>blog!==postToDelete)
      localStorage.setItem("blogs",JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
  }
  const handleEditBlog = (blog) => {
    setSelectPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };
  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };
  const handleShowNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectPost(null);
  };
  return (
    <div className="container w-[100%] h-[100vh] bg-gradient-to-r from-[#b88efc] to-[#6877f4] grid  place-items-center ">
      <div className="NewAndblogs w-[95vw] min-h-[95vh] bg-[#060709] shadow-[0_2rem_3rem_rgba(0,0,0,0.5)] rounded-[1rem] sm:flex sm:flex-col">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            onDelete={handleDeletePost}
          ></News>
        )}

        {showBlogs && (
          <Blogs
            onBack={handleShowNews}
            onCreateBlog={handleCreateBlog}
            editPost={selectedPost}
            isEditing={isEditing}
          ></Blogs>
        )}
      </div>
    </div>
  );
}

export default App;
