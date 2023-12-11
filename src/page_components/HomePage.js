import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import "../css/homePage.css";
// import ScrollContainer from "./ScrollContainer";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [articleCategory, setArticleCategory] = useState("general");
  const [articleLanguage, setArticleCLanguage] = useState("en");

  //Code has two fetch article functions, one fetches articles from the "top-headlines" endpoint, the other one fetches from "everything" endpoint.
  //Top headlines function is more usable, contains better articles
  const fetchTopArticles = async (country, category, withHistory) => {
    const apiKey = "2a797461e90448799c9c602abb432b4f";
    console.log("Fetching news...");
    // Define query parameters for "top-headlines" endpoint
    var url =
      "https://newsapi.org/v2/top-headlines?" +
      "category=" +
      category +
      "&country=" +
      country +
      "&pageSize=100" +
      "&apiKey=" +
      apiKey;

    var req = new Request(url);

    // Fetch the data from the API
    let a = await fetch(req);
    let response = await a.json();

    //Remove all articles that are empty
    let filteredArticles = response.articles.filter(
      (article) => article.title !== "[Removed]"
    );

    //Depending on the situation, we can choose if the user can view articles that they scrolled by before
    if (withHistory) {
      setArticles((prevArticles) => [...prevArticles, ...filteredArticles]);
    } else {
      setArticles(filteredArticles);
    }
    console.log(response);
  };

  // const fetchArticles = async (keywords, language) => {
  //   const apiKey = "2a797461e90448799c9c602abb432b4f";
  //   const today = new Date();
  //   const twoDaysAgo = new Date();
  //   twoDaysAgo.setDate(today.getDate() - 2);

  //   // Converts the dates to 'YYYY-MM-DD' format
  //   //This is used for the API call so it recognizes from what date to search for articles
  //   const formatDate = (date) => {
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, "0");
  //     const day = String(date.getDate()).padStart(2, "0");
  //     return `${year}-${month}-${day}`;
  //   };

  //   const todayISO = formatDate(today);
  //   const twoDaysAgoISO = formatDate(twoDaysAgo);

  //   console.log("Fetching news...");
  //   // Define query parameters for "everything" endpoint
  //   var url =
  //     "https://newsapi.org/v2/everything?" +
  //     "q=" +
  //     keywords +
  //     "&from=" +
  //     twoDaysAgoISO +
  //     "&language=" +
  //     language +
  //     "&sortBy=popularity&" +
  //     "pageSize=100&" +
  //     "apiKey=" +
  //     apiKey +
  //     `&timestamp=${Date.now()}`; // Add a timestamp to the query

  //   var req = new Request(url);

  //   // Fetch the data from the API
  //   let a = await fetch(req);
  //   let response = await a.json();
  //   setArticles((prevArticles) => [...prevArticles, ...response.articles]);
  //   console.log(response);

  //   //Example how to acquire information from the fetches array of articles
  //   //response.articles[0].title;
  //   //response.articles[0].image;
  // };

  //handles the string that was passed from sidebar.js
  //uses the category in article fetching
  const handleCategoryChange = async (category) => {
    setArticleCategory(category);
    fetchTopArticles("us", category, false); // Fetch new articles with the updated category
    console.log(category);
  };

  const handleLanguageChange = async (language) => {
    setArticleCLanguage(language);
    fetchTopArticles(language, articleCategory, false);
  };

  useEffect(() => {
    fetchTopArticles("us", articleCategory, true);
  }, [page]);

  function ScrollContainer() {
    const [ref, isVisible] = useInView({
      threshold: 0.2,
    });

    const loadMoreArticles = () => {
      setPage(page + 1);
    };

    useEffect(() => {
      if (isVisible) {
        loadMoreArticles();
      }
    }, [isVisible]);

    return (
      <div className="List">
        {articles.map((article, index) => (
          <a
            href={article.url} // Set the URL from the article data
            target="_blank" // Opens the link in a new tab
            key={index}
            className="ClickableContainer"
          >
            <div className="Item" key={index}>
              <div className="ImageContainer">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="ResponsiveImage"
                />
              </div>
              <h2 className="article-title">{article.title}</h2>
            </div>
          </a>
        ))}
        <div className="Loader" ref={ref}>
          <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="HomePageContainer">
        <SideBar onCategoryChange={handleCategoryChange} />
        {ScrollContainer()}
      </div>
    </>
  );
}
