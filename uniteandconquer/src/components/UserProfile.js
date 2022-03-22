import React from 'react';
import { Link } from 'react-router-dom';
import SidebarTags from './SidebarTags';
import '../assets/UserProfile.css';

function UserProfile() {
  return (
    <div className="user-profile">
      <SidebarTags />
      <div>
        <div className="profile-title"><h1>My Profile</h1></div>
        <table>
          <tr>
            <th>My Owned Posts</th>
            <th>My Joined Posts</th>
          </tr>
          <tr>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
            <td>
              <Link className="link" to="/post-details">
                <div className="post-title">This is Post</div>
                <div className="post-content">
                  This post is led by Jeremy and trades [ITEM] for $[VALUE] with
                  maturity [DATE]
                </div>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default UserProfile;
