import {
  collection,
  addDoc,
  writeBatch,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export const uploadArticles = async (articles, date, category) => {
  let batch = writeBatch(db);
  const actualDate = new Date(articles[0].publishedAt)
    .toISOString()
    .split("T")[0];

  //Iterate through article array
  let promises = articles.map((article) => {
    const payload = {
      author: article.author,
      description: article.description,
      publishedAt: actualDate,
      source: article.source.name,
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    let collectionRef = collection(db, "articles", actualDate, category);

    let encodedUrl = payload.url.replace(/\//g, "_");

    let docRef = doc(db, "articles", actualDate, category, encodedUrl);

    //Check if database already has the same articles, if not add new ones
    let querySnapshot = query(collectionRef, where("url", "==", encodedUrl));
    return getDocs(querySnapshot)
      .then((docs) => {
        if (docs.empty) {
          // No matching articles found, add the new article
          batch.set(docRef, payload);
        }
      })
      .catch((error) => {
        console.error("Error querying Firestore: ", error);
      });
  });

  // Wait for all Promises to resolve
  Promise.all(promises)
    .then(() => {
      // Commit the batch after all documents have been added
      return batch.commit();
    })
    .then(() => {
      console.log("Batch write completed successfully");
    })
    .catch((error) => {
      console.error("Error writing batch: ", error);
    });
};

export const fetchTopArticles = async (country, category, date) => {
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
    "from=" +
    date +
    "to=" +
    date +
    "&apiKey=" +
    apiKey;

  // Fetch the data from the API
  var req = new Request(url);
  let a = await fetch(req);
  let response = await a.json();

  //Remove all articles that are empty
  let filteredArticles = response.articles.filter(
    (article) => article.title !== "[Removed]"
  );

  // Remove duplicate articles based on URL
  filteredArticles = filteredArticles.filter(
    (article, index, self) =>
      index === self.findIndex((t) => t.url === article.url)
  );
  return filteredArticles;
};

export const fetchEverythingArticles = async (keywords, language) => {
  const apiKey = "2a797461e90448799c9c602abb432b4f";
  const today = new Date();
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);

  // Converts the dates to 'YYYY-MM-DD' format
  //This is used for the API call so it recognizes from what date to search for articles
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayISO = formatDate(today);
  const twoDaysAgoISO = formatDate(twoDaysAgo);

  console.log("Fetching news...");
  // Define query parameters for "everything" endpoint
  var url =
    "https://newsapi.org/v2/everything?" +
    "q=" +
    keywords +
    "&from=" +
    twoDaysAgoISO +
    "&language=" +
    language +
    "&sortBy=popularity&" +
    "pageSize=100&" +
    "apiKey=" +
    apiKey +
    `&timestamp=${Date.now()}`; // Add a timestamp to the query

  var req = new Request(url);

  // Fetch the data from the API
  var req = new Request(url);
  let a = await fetch(req);
  let response = await a.json();

  //Remove all articles that are empty
  let filteredArticles = response.articles.filter(
    (article) => article.title !== "[Removed]"
  );

  // Remove duplicate articles based on URL
  filteredArticles = filteredArticles.filter(
    (article, index, self) =>
      index === self.findIndex((t) => t.url === article.url)
  );

  return filteredArticles;
};

export const fetchArticlesFromDatabase = async (date, category) => {
  let collectionRef = collection(db, "articles", date, category);

  let querySnapshot = await getDocs(collectionRef);
  let articles = [];
  for (let doc of querySnapshot.docs) {
    // let article = doc.data();
    let article = await fetchLikesAndDislikesCount(doc.data());
    let updatedArticle = await fetchUserInteraction(article);
    articles.push(updatedArticle);
  }

  return articles;
};

export const fetchUserInteraction = async (article) => {
  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;

    const articleID = article.url.replace(/\//g, "_");
    const q = query(
      collection(db, "articleInteraction"),
      where("user_id", "==", uid),
      where("article_id", "==", articleID)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      article.userHasLiked = false;
      article.userHasDisliked = false;
      const data = doc.data();
      if (data.type === "like") {
        article.userHasLiked = true;
        article.userHasDisliked = false;
      } else if (data.type === "dislike") {
        article.userHasLiked = false;
        article.userHasDisliked = true;
      }
    });
  }

  return article;
};

export const fetchLikesAndDislikesCount = (article) => {
  let articleID = article.url.replace(/\//g, "_");
  const articleInteractionRef = collection(db, "articleInteraction");
  const q = query(articleInteractionRef, where("article_id", "==", articleID));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let likes = 0;
    let dislikes = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.type === "like") {
        likes++;
      } else if (data.type === "dislike") {
        dislikes++;
      }
    });
    article.likes = likes;
    article.dislikes = dislikes;
  });
  return article;
};
