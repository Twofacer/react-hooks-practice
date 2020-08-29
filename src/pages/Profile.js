import React, { useContext, useEffect, Fragment } from 'react'
import { GithubContext } from '../context/github/githubContext'
import {Link} from 'react-router-dom'
import { Repos } from '../components/repos'
export const Profile =({match}) => {
    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
    const urlName = match.params.name
    useEffect(() => {
       getUser(urlName)
       getRepos(urlName)
       // eslint-disable-next-line 
    }, [])
   
    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        email
    } = user
   
    return (
        <Fragment>
            <Link to='/' className='btn btn-link'> Return to search</Link>
            <div className="card mb-4">
                <div className="card-body">
                    <div className='col-sm-12 text-center'>
                        <img src={avatar_url} alt={name} style={{width: "250px"}}></img>
                         <h1>{name}</h1>
                          {location && <p>Location: {location}</p>} 
                    </div>
                    <div className="col">
                        {
                            bio  && <Fragment>
                                <h3 style={{textAlign: 'center'}}>BIO</h3>
                        <p style={{textAlign: 'center'}}>{bio}</p>
                            </Fragment>
                        }
                        <div className='dop_info_holder'>
                        <a
                            href={html_url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-dark customization_open_button">Open profile</a>
                            <ul>
                                {login && <li>
                                <strong>Username: </strong>
                                {login}
                                </li>}
                                {email && <li>
                                <strong>Email: </strong>
                                <a href={'mailto:' + email}>{email}</a>
                                
                                </li>}
                                {company && <li>
                                <strong>Company: </strong>
                                {company}
                                </li>}
                                {blog && <li>
                                <strong>Website: </strong>
                                <a href={blog} target='_blank'>{blog}</a>
                              
                                </li>}
                            </ul>
                            </div>
                            <div className="user_info_holder">
                            <div className="badge badge-primary">Followers: {followers}</div>               
                            <div className="badge badge-success">Following: {following}</div>               
                            <div className="badge badge-info">Repos: {public_repos}</div>               
                            <div className="badge badge-dark">Gists: {public_gists}</div> 
                            </div>
                                         
                    </div>
                </div>
            </div>
            <Repos repos={repos}></Repos>
        </Fragment>
    )
} 