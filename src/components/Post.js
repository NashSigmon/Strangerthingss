import React, { useState, useEffect } from "react";
import Logout from "./Logout"


const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`



function SearchBar(SearchKey) {
    let Post_IDs = []

    let PostContainer = document.querySelector('#PostContainer').children


    Object.entries(PostContainer).forEach(entry => {
        const [key, Post] = entry


        let PostPrice = Post.querySelector('.PostPrice').innerHTML.toUpperCase()
        let PostLocation = Post.querySelector('.PostLocation').innerHTML.toUpperCase()
        let PostName = Post.querySelector('.PostName').innerHTML.toUpperCase()
        let PostSeller = Post.querySelector('.PostSeller').innerHTML.toUpperCase()

        const isVisible = PostName.includes(SearchKey.toUpperCase()) || PostLocation.includes(SearchKey.toUpperCase())
            || PostSeller.includes(SearchKey.toUpperCase()) || PostPrice.includes(SearchKey.toUpperCase())

        Post.hidden = !isVisible
    })

}

async function MakePost(make_Title, make_Description, make_Price, make_Location, Delivery) {
    let NewToken = Math.random().toString(36).substring(2);
    const result = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${NewToken}`,
            
        },
        body: JSON.stringify({
            post: {
                title: make_Title,
                description: make_Description,
                price: make_Price,
                location: make_Location,
                willDeliver: Delivery
            }
        })
    }).then(function(response){
        console.log(response)

        if(response.status!== 200){
            throw new Error(`A ${response.status} has occurred, Reason: ${response.statusText}`)
        }
    })
    console.log(result)
}

const Post = () => {
    let LoggedIn = localStorage.getItem('LoggedIn')
    let Username = localStorage.getItem('Username')

    let Delivery = false

    const [PostData, setPostData] = useState('Loading')
    const [SearchKey, setSearchKey] = useState('')

    const [make_Description, setmake_Description] = useState('')
    const [make_Price, setmake_Price] = useState('')
    const [make_Location, setmake_Location] = useState('')
    const [make_Title, setmake_Title] = useState('')

    const [NewPost, setNewPost] = useState('')

    function HandleForm(event) {
        if (event.target.id === 'Searchbar') {
            setSearchKey(event.target.value)
            setNewPost('Not Posting')
        } else {
            event.preventDefault()
            setNewPost('Posting')
        }
    }




    useEffect(() => {
        function fetchAllPost() {
            fetch(`${BASE_URL}/posts`, {

            }).then(response => {
                return response.json()   //Get Our Post Data
            }).then((response) => setPostData(response))
        }

        fetchAllPost()
        if (PostData !== 'Loading' && NewPost === 'Not Posting') {
            SearchBar(SearchKey)
        } else if (PostData !== 'Loading' && NewPost === 'Posting') {
            MakePost(make_Title, make_Description, make_Price, make_Location, Delivery)
        }
    }, [SearchKey, NewPost])
    
    if (LoggedIn === "TRUE") {

        if (PostData !== 'Loading') {

            return (
                <section id="Postpage">
                    <form id="MakeAPost" onSubmit={HandleForm}>
                        <h3>Create A New Post Here</h3>
                        <input className="TextBox" id="MakeTitle"
                            value={make_Title}
                            placeholder="Title"
                            onChange={e => { setmake_Title(e.target.value) }}
                        ></input>
                        <p className="InvalidData" id="MakeTitle_Cred">Keep it below  characters</p>
                        <input className="TextBox" id="MakeDescription"
                            value={make_Description}
                            placeholder="Tell everybody what your product is all about!"
                            onChange={e => { setmake_Description(e.target.value) }}
                        ></input>
                        <p className="InvalidData" id="MakeDes_Cred">Keep it below 100 words</p>


                        <div id="MakeContainer">
                            <input className="TextBox" id="MakePrice"
                                value={make_Price}
                                placeholder="Price"
                                onChange={e => { setmake_Price(e.target.value) }}
                            ></input>

                            <input className="TextBox" id="MakeLocation"
                                value={make_Location}
                                placeholder="Location"
                                onChange={e => { setmake_Location(e.target.value) }}
                            ></input>

                            <label id="WillDeliver">Will Deliver
                                <input type="Checkbox" id="checkBox" onChange={e => {
                                    if(document.getElementById('checkBox').checked){
                                        Delivery = true
                                    }else{
                                        Delivery = false
                                    }
                                }} />
                            </label>
                        </div>
                        <p className="InvalidData" id="MakePri_Cred">Numbers Only</p>
                        <div id="MakeContainer_2">
                            <button id="PublishPost">Publish</button>

                        </div>
                    </form>




                    <div id="AllPost">
                        <input id="Searchbar"
                            className="TextBox"
                            value={SearchKey}
                            type="text"
                            placeholder="Search"
                            onChange={HandleForm}
                        ></input>
                        <div id="PostContainer">

                            {PostData.data.posts.map(x => {

                                return (
                                    <div className="Post" id={x._id}>
                                        <h4 className="PostName">{x.title}</h4>
                                        <p className="PostDecription">{x.description}</p>
                                        <h5 className="PostPrice">Price: {x.price}</h5>
                                        <h5 className="PostSeller">Seller: {x.author.username}</h5>
                                        <h5 className="PostLocation">Location: {x.location}</h5>
                                        <button className="VeiwPost">More Details</button>
                                    </div>
                                )
                            })}
                        </div>


                    </div>

                </section>
            )
        }

    } else {
        return (
            <Logout />
        )
    }
    //To get a token, you need to get a special key from loginng in annd logout out.
    //Must return a HTML element.
}




export default Post