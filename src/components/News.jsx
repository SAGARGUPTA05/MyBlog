import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calender from "./Calender";
import "./News.css";
import user from "../assets/images/sagar.jpg";
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import NewsModel from "./NewsModel";
import BookMarks from "./BookMarks";
import BlogsModel from "./BlogsModel";

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

function News({ onShowBlogs, blogs,onEditBlog,onDelete}) {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectCategory, setSelectCategory] = useState("general");
  const [showModel, setShowModel] = useState(false);
  const [selectArticle, setSelectArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [selectedPost,setSelectedPost]=useState(null)
  const [showBlogModel,setShowBlogModel]=useState(false)

  
  useEffect(() => {
    async function fetchNews() {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectCategory}&lang=en&apikey=47bfb54bbc7e5b92f3e0b183aca8d5b8`;
      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=47bfb54bbc7e5b92f3e0b183aca8d5b8`;
      }
      const response = await axios.get(url);
      const fetchnews = response.data.articles;

      fetchnews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });
      setHeadline(fetchnews[0]);
      setNews(fetchnews.slice(1, 7));
      const savedBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarks(savedBookmarks);
    }

    fetchNews();
  }, [selectCategory, searchQuery]);

  function onselectHandler(e, category) {
    e.preventDefault();
    setSelectCategory(category);
  }

  function onsearchHandler(e) {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  }

  function handleArticle(article) {
    setSelectArticle(article);
    setShowModel(true);
  }

  function handleBookmarks(article) {
    setBookmarks((prevBookmarks) => {
      const updateBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmarks.filter((bookmarks) => bookmarks.title !== article.title)
        : [...prevBookmarks, article];
      localStorage.setItem("bookmarks", JSON.stringify(updateBookmarks));
      return updateBookmarks;
    });
  }

  const handleBlogClick=(blog)=>{
       setSelectedPost(blog)
       setShowBlogModel(true)
  }
  const handleCloseBlogModel=()=>{
    setShowBlogModel(false)
    setSelectedPost(null)
  }

  return (
    <div className="text-[2rem] text-[#fff] w-[100%] h-[95vh] flex flex-col  justify-between  gap-y-8 ">
      <header className="  w-[100%] lg:min-h-28 md:min-h-28 bg-[#111214] rounded-t-md flex   lg:flex-row  md:flex-row justify-between items-center p-0 pl-16 pr-16 flex-col ">
        <h1 className="NewsAndBlogs lg:text-[5rem] md:text-[5rem] text-[3rem]">News & Blogs</h1>
        <div className="relative">
          <form onSubmit={onsearchHandler}>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              className="w-[25rem] h-[4rem] bg-[#060709]  border-none  rounded-[5rem]  pt-0 pb-0 pr-16 pl-8   text-[#ddd] focus:w-[35rem] transition-all focus:placeholder-transparent"
              placeholder="Search News..."
            />
            <button className="bg-transparent border-none absolute top-[50%] right-4 translate-y-[-50%] text-[#bbb]  text-[1.8rem]">
              {" "}
              <i className=" cursor-pointer fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
    {/*Main section */}
      <div className="flex lg:flex-row  md:flex-row flex-col gap-x-8 h-[calc(100%-16rem)] pt-0 pb-0 pr-[2rem] pl-[2rem]   ">
        <div className="  lg:w-[18rem] md:w-[18rem] w-[100%] h-[100%] flex flex-col gap-y-8">
          <div
            className="w-[100%] h-[100%] bg-[#111214]  rounded-2xl flex flex-col justify-center items-center gap-y-4 cursor-pointer  "
            onClick={onShowBlogs}
          >
            <img
              src={user}
              className="w-[7rem] aspect-square object-cover rounded-full"
              alt="user image"
            />
            <p
              style={{
                fontFamily: "Comfortaa,sans-serif",
                fontSize: "1.5rem",
                color: "#ddd",
              }}
            >
              Sagar's Blog
            </p>
          </div>
          <div className="flex flex-col gap-y-8 p-8  w-[100%] h-[calc(80%-2rem)] bg-[#111214] rounded-2xl sm:justify-center sm:items-center">
            <h1
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(1.5rem,2.5cqi,3rem)",
                letterSpacing: "0.2rem",
                marginBottom: "2rem",
              }}
            >
              Categories
            </h1>
            <div className="flex flex-col gap-y-1 ">
              {categories.map((category) => (
                <a
                  className="navlink focus:font-bold hover:translate-y-1 hover:translate-x-1 transition-all "
                  href="#"
                  key={category}
                  onClick={(e) => onselectHandler(e, category)}
                >
                  {category}
                </a>
              ))}

              <a className="navlink" href="#">
                Bookmarks
                <i
                  onClick={() => setShowBookmarks(true)}
                  className="fa-solid fa-bookmark text-[1.6rem] ml-4"
                ></i>
              </a>
            </div>
          </div>
        </div>
        <div className="w-[clamp(30rem,43cqi,40%)] rounded-2xl h-[100%]  sm:w-[100%]">
          {headline && (
            <div
              onClick={() => handleArticle(headline)}
              className=" relative w-[100%] h-[calc(50%-2rem)] bg-[#111214] rounded-2xl mb-8  "
            >
              <img
                src={headline.image || noImg}
                className="opacity-40 w-[100%] h-[100%] object-cover rounded-2xl"
                alt={headline.title}
              />
              <h2
                className="w-[100%] absolute bottom-0 left-0 pt-4 pb-4 pr-16 pl-4"
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamo(1.5rem,1.8cqi,3rem",
                  letterSpacing: "0.1rem",
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  borderRadius: "0 0 1rem 1rem",
                }}
              >
                {headline.title}
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarks(headline);
                  }}
                  className={` ${
                    bookmarks.some(
                      (bookmarks) => bookmarks.title === headline.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark bookmark absolute bottom-4 right-4 cursor-pointer`}
                ></i>
              </h2>
            </div>
          )}
          <div className="news-grid  grid sm:grid-cols-1 grid-cols-3 grid-rows-2 gap-x-4 gap-y-16 p-5 justify-center items-center w-[100%] h-1/2 rounded-2xl bg-[#111214] ">
            {news.map((article, index) => (
              <div
                onClick={() => handleArticle(article)}
                key={index}
                className="news-grid-item"
              >
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title.substring(0, 10) + "..."}
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarks(article);
                    }}
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModel
          show={showModel}
          article={selectArticle}
          onclose={() => setShowModel(false)}
        ></NewsModel>
        <BookMarks
          show={showBookmarks}
          bookmarks={bookmarks}
          onclose={() => setShowBookmarks(false)}
          onSelectArticle={handleArticle}
          onDeleteBookmark={handleBookmarks}
        ></BookMarks>
        <div className=" flex flex-col gap-y-12 pb-8 lg:w-[clamp(20rem,27cqi,28%)] md:w-[clamp(20rem,27cqi,28%)] h-[100%] bg-[#111214] rounded-2xl w-[100%] ">
          <h1
            style={{
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "3rem",
              color: "#ddd",
              letterSpacing: "0.1rem",
              padding: "2rem",
            }}
          >
            My Blogs
          </h1>
          <div className="grid lg:grid-cols-2  md:grid-cols-2 grid-cols-1 gap-5 p-5 lg:overflow-y-hidden  md:overflow-y-hidden overflow-y-scroll grid-rows-4">
            {blogs.map((blog, index) => (
              <div
                onClick={()=>(handleBlogClick(blog))}
                key={index}
                className="relative rounded-2xl group overflow-hidden"
              >
                <img
                  className="w-full h-full opacity-50 object-cover rounded-2xl"
                  src={blog.image || noImg}
                  alt={blog.title}
                />

                <h3
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    padding: "1rem",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: "0 0 1rem 1rem",
                    fontSize: "1.6rem",
                    fontWeight: "300",
                    color: "#fff",
                    lineHeight: "1.6rem",
                    textTransform: "uppercase",
                    overflowWrap: "break-word",
                    width: "100%",
                  }}
                >
                  {blog.title}
                </h3>

                

                <div className="absolute top-4 right-4 flex justify-center gap-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button  onClick={()=> onEditBlog(blog)}
                  className="bg-transparent border-none text-[2.5rem] text-white cursor-pointer">
                    <i  className="bx bxs-edit"></i>
                  </button>
                  <button  onClick={(e)=>{ e.stopPropagation()
                    onDelete(blog)}}
                   className="bg-transparent border-none text-[2.5rem] text-white cursor-pointer">
                    <i className="bx bx-x-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedPost &&showBlogModel &&  (<BlogsModel show={showBlogModel} blog={selectedPost} onclose={handleCloseBlogModel}></BlogsModel>)}
         
        </div>
        <div className="flex-1 flex flex-col gap-y-8">
          <Weather></Weather>
          <Calender></Calender>
        </div>
      </div>

      <footer className="w-[100%] min-h-20 bg-[#111214] rounded-b-md flex flex-col sm:flex-row items-center justify-between py-4 px-4 sm:py-0 sm:px-16">
  <p className="text-[1.4rem] font-[300] text-[#bbb] text-center sm:text-left">
    <span
      style={{ fontFamily: "Bebus Neue, sans-serif", fontSize: "2rem" }}
    >
      News & Blogs App
    </span>
  </p>
  <p className="text-[1.4rem] font-[300] text-[#bbb] text-center sm:text-right">
    &copy; All Right Reserved. By Sagar Gupta
  </p>
</footer>

    </div>
  );
}

export default News;
