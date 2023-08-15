const darkIcon = document.querySelector('.dark-icon')
const lightIcon = document.querySelector('.light-icon')
const darkText = document.querySelector('.dark-theme-text')
const lightText = document.querySelector('.light-theme-text')

const userTheme = localStorage.getItem('theme') //theme the user prefers
const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches //system theme 

const iconToggle =()=>{
    darkIcon.classList.toggle('hidden')
    lightIcon.classList.toggle('hidden')
}
const themeCheck = () =>{
    if(userTheme ==="dark" || (!userTheme && systemTheme)){
        document.documentElement.classList.add("dark")
        lightIcon.classList.remove("hidden")
        darkIcon.classList.add("hidden")
        // lightText.classList.remove("hidden")
        // darkText.innerText = "WHITE"
        // darkText.style.color = 'white'
        
       
        return
    }
    lightIcon.classList.add("hidden")
    darkIcon.classList.remove("hidden")
    // darkText.classList.remove("hidden")

    // darkText.innerText = "DARK"
    // darkText.style.color = '#4B6A9B'
}
const themeSwitch =()=>{
    if(document.documentElement.classList.contains("dark")){
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme","light")
        iconToggle()
        return
    }//if th
    document.documentElement.classList.add("dark")
   
    localStorage.setItem("theme","dark")
    iconToggle()
}
darkIcon.addEventListener("click", ()=>{
    console.log('working')
    themeSwitch()
})
lightIcon.addEventListener("click", ()=>{
    themeSwitch()
})
themeCheck()
async function getUserInfo() {
    const username = document.getElementById("username").value;
    const name = document.getElementById('name')
    const locationImage = document.getElementById('location-image')
    const companyImage = document.getElementById('company-image')
    const usernameDisplay = document.getElementById('usernameDisplay')
    const bio = document.getElementById('bio')
    const picture = document.getElementById('picture')
    const joined = document.getElementById('joined')
    const repos = document.getElementById('repos')
    const followers = document.getElementById('followers')
    const following = document.getElementById('following')
    const location = document.getElementById('location')
    const githubLink = document.getElementById('github-link')
    const company = document.getElementById('company')
    const twitter = document.getElementById('twitter')
    const notFound = document.getElementById('not-found')
    const clientId = "7abbb78cc7b5635de68e";
    const clientSecret = "You need a client secret to authenticate as the application to the API.";

    try {
        if(username == ''){
            notFound.innerText = "Please enter a username"
            notFound.style.display = "block"
        }
        response = await fetch(`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`);
        
        if (response.status === 404) {
            // User not found
            notFound.style.display = "block"
            return;
        }
        const data = await response.json();
        // Update the HTML with user info
        // const userInfoDiv = document.getElementById("user-info");
        name.innerText = data.name
        usernameDisplay.innerText = "@" + data.login
        if(data.bio == null){
            bio.innerText = 'No bio'
        }else{
            bio.innerText = data.bio
        }
        picture.src = data.avatar_url
        if (data.twitter_username === null ){
            twitter.innerText = 'Not Available'
            twitter.style.color = "#697C9A"
        } else{
            twitter.innerText = '@'+ data.twitter_username
        }
        githubLink.href = data.html_url
        githubLink.innerText = data.html_url
        
        if (data.location === null ){
            location.innerText = "Location not specified"
            location.style.color= '#697C9A'
            locationImage.style.color= '#697C9A'
        } else{
            location.innerText =  data.location
            
        }
        if (data.company === null ){
            company.innerText = "Company not specified"
            company.style.color= '#697C9A'
            companyImage.style.color= '#697C9A'
            
        } else{
            company.innerText =  data.company
        }
        following.innerText = data.following
        followers.innerText = data.followers
        repos.innerText = data.public_repos
        joined.innerText = formatDate(data.created_at)
        function formatDate(dateString) {
            const options = { day: "numeric", month: "short", year: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    }catch (error) {
        console.error("Error fetching user data:", error)

    }
}

