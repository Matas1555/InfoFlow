import SideBar from "./SideBar";
import ScrollContainer from "./ScrollContainer";


export default function HomePage(){

    const fetchArticles = async (keywords, language) =>{
        const apiKey = '2a797461e90448799c9c602abb432b4f';
        const today = new Date();
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(today.getDate() - 2);
    
        const title = document.getElementById('article-title');
    
    
        // Convert the dates to 'YYYY-MM-DD' format
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
    
        const todayISO = formatDate(today);
        const twoDaysAgoISO = formatDate(twoDaysAgo);
    
    
        console.log("Fetching news...");
        // Define query parameters
        var url = 'https://newsapi.org/v2/everything?' +
                'q=' +keywords+
                '&from=' +twoDaysAgoISO+
                '&language='+language+
                '&sortBy=popularity&' +
                'pageSize=10&' + 
                'apiKey=' + apiKey;
    
        var req = new Request(url);
    
        // Fetch the data from the API
        let a = await fetch(req)
        let response = await a.json()
        console.log(response);
        
        title.innerHTML = response.articles[0].title;
    
        for(let item in response.articles){
            //title.innerHTML = item.title;
        }
    
    }

    return (
        <>
            <h1>homePage</h1>
        
            
            <ScrollContainer/>
            <SideBar/>
            
            
           
            
            
        </>
        
        
    );
  
}