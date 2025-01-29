import React, { useEffect, useState } from "react";
import userImg from "../assets/images/sagar.jpg";
import leftbg from "../assets/images/bg.jpg";
import noImg from "../assets/images/no-img.png";
function Blogs({ onBack, onCreateBlog,editPost,isEditing  }) {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submited, setSubmited] = useState(false);
  const [titleValid,setTitleValid]=useState(true)
  const [contentValid,setContentValid]=useState(true)

  useEffect(()=>{
    if(isEditing && editPost)
    {
      setImage(editPost.image)
      setTitle(editPost.title)
      setContent(editPost.content)
      setShowForm(true)
      
    }
    else{
      setImage(null)
      setTitle("")
      setContent("")
      setShowForm(false)
    }
  },[isEditing,editPost])

  const handleTitleChange=(e)=>{
    setTitle(e.target.value)
    setTitleValid(true)
        
  }
  const handleContentChange=(e)=>{
    setContent(e.target.value)
    setContentValid(true)
    
}
  const handleIamgeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file=e.target.files[0]
      const maxSize=1*1024*1024
      if(file.size>maxSize)
      {
        alert("file size exceeds 1 MB")
        return
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !content)
    {
      if(!title)
      {
        setTitleValid(false)
      }
      if(!content)
        {
          setContentValid(false)
        }
        return 
    }
    const newBlog = {
      image: image || noImg,
      title,
      content,
    };
    onCreateBlog(newBlog,isEditing);
    setImage(null);
    setTitle("");
    setContent("");
    setShowForm(false);
    setSubmited(true);
    setTimeout(()=>{
          setSubmited(false)
          onBack()
    },2000)
  };

  return (
    <div className="w-[100%] h-[95vh] flex  sm:justify-center sm:items-center  ">
      <div className="hidden lg:flex md:flex"
        style={{
          background: `linear-gradient(rgba(184,142,252,0.3), rgba(104,119,244,0.2)), url(${leftbg}) center no-repeat`,
          backgroundSize: "cover",
          width: "50%",
          height: "100%",
          borderRadius: "1rem 0 0 1rem",
          position: "relative",
        }}
      >
        <img
          className=" absolute rounded-full border-[0.3rem] border-solid border-[#6877f4] w-[15rem] aspect-square object-cover top-[50%] translate-y-[-50%] right-[-7.5rem] "
          src={userImg}
          alt=""
        />
      </div>
      <div className=" relative felx justify-center items-center w-[50%] h-[100%]    ">
        {!showForm && !submited && (
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="flex items-center justify-center absolute lg:top-[40%]   lg:right-[30%] md:top-[40%]   md:right-[30%]  active:translate-y-1 transition-all top-[50%] right-[-38%]"
            style={{
              width: "clamp(15rem,16cqi,30rem)",
              aspectRatio: "4/1",
              background: "linear-gradient(to right,#b88efc,#6877f4)",
              border: "none",
              borderRadius: "2rem",
              fontSize: "clmp(1.6rem,1.5cqi,2.5rem)",
              textTransform: "uppercase",
              color: "#fff",
              textShadow: "0 .5rem 1rem rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
          >
            CREATE NEW POST
          </button>
        )}
        {submited  && <p className="  lg:ml-[20%] lg:mt-[40%]  md:ml-[20%] md:mt-[40%] text-[6rem] uppercase bg-gradient-to-r from-[#b88efc] to-[#6877f4] "
                     style={{WebkitBackgroundClip:"text",
                               WebkitTextFillColor:"transparent"
                     }}>Post Submitted!</p>}
        <div
          className={`absolute lg:top-[15%] lg:right-[30%] md:top-[15%] md:right-[30%] flex flex-col items-center gap-y-0  top-[30%] right-[-38%] ${
            showForm ? "flex" : "hidden"
          } `}
        >
          <h1
            style={{
              fontFamily: "Comfortaa,sans-serif",
              fontSize: "clamp(2rem,6cqi,6rem)",
              textTransform: "uppercase",
              background: "linear-gradient(to right,#b88efc,#6877f4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
           {isEditing ? ("Edit Post"):("New Post")}
          </h1>
          <form onSubmit={handleSubmit} className="flex  flex-col gap-y-16">
            <div>
              <label
                htmlFor="file-upload"
                className="flex items-center gap-x-8  text-[2rem] text-[#bbb] cursor-pointer"
              >
                <i className="bx bx-upload text-[3rem] text-[#b883fc]"></i>
                Upload Image
              </label>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleIamgeChange}
              />
            </div>
            <input
              value={title}
              maxLength={60}
              onChange={handleTitleChange}
              className={`placeholder:opacity-50 placeholder:text-[1.3rem] placeholder:text-[#b88efc]  focus:placeholder:text-transparent
                 ${!titleValid ? "border-b-[0.1rem] border-solid border-[#c4143a] placeholder:text-[#c4143a]  ":""}`}
              style={{
                width: "clamp(15rem,25cqi,45rem)",
                fontSize: "1.8rem",
                background: "transparent",
                border: "none",
                borderBottom: "0.1rem solid #b88efc",
                padding: "2rem 0",
                color: "#ddd",
              }}
              type="text"
              placeholder="Add Title(Max 60 Characters)"
            />
            <textarea
              value={content}
              maxLength={300}
              onChange={handleContentChange}
              className={` overflow-hidden resize-none text-[1.6rem] placeholder:text-[1.3rem] placeholder:text-[#b88efc] placeholder:opacity-50 focus:placeholder:text-transparent
                ${!contentValid ? "border-b-[0.1rem] border-solid border-[#c4143a] placeholder:text-[#c4143a] ":""}
                `}
              style={{
                
                width: "clamp(15rem,25cqi,45rem)",
                background: "transparent",
                border: "none",
                borderBottom: "0.1rem solid #b88efc",
                padding: "2rem 0",
                color: "#ddd",
                aspectRatio: "5/2",
              }}
              name=""
              placeholder="Add Text"
            ></textarea>
            <button
              className=" active:translate-y-2 text-[#fff] h-[5rem]  bg-gradient-to-l from-[#b88efc] to-[#6877f4] rounded-[5rem] text-[1.8rem] uppercase shadow-[0 .5rem 1rem rgba(0,0,0,0.2] cursor-pointer transition-all"
              type="submit"
            >
              {!isEditing ? "Submit Post":"Update Post"}
            </button>
          </form>
        </div>

        <button
          onClick={onBack}
          style={{ fontFamily: "Bebas Neue,sans-serif" }}
          className="text-[#ddd] text-[3rem] flex items-center justify-center absolute top-[3rem] right-[2.5rem] bg-transparent border-none "
        >
          back <i className="bx bx-chevron-right text-[5rem]"></i>
        </button>
      </div>
    </div>
  );
}

export default Blogs;
