import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarTags from './SidebarTags';
import Notifications from './Notifications';
import '../assets/UserProfile.css';

function UserProfile() {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <div className="user-profile-page">
      <SidebarTags />
      <div>
        <div className="profile-title"><h1>My Profile</h1></div>
        <div className="bell-pos">
          <button data-testid="show-notifications" className="bell-button" type="button" onClick={() => setShowNotifs(!showNotifs)}>
            {' '}
            <i className="fas fa-bell fa-2x" />
          </button>
        </div>
        <div className="notifications-pos">{showNotifs ? <Notifications showNotifs={showNotifs} setShowNotifs={setShowNotifs} /> : ''}</div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>My Active Posts</th>
                <th>My Wishlist</th>
              </tr>
              <tr>
                <td>
                  <Link className="link" to="/post-details">
                    <div className="post-title">Post [ID]: [itemName] - [status]</div>
                    <div className="post-content">
                      This post is led by [ownerName] and trades
                      [itemNumTarget] of [itemCurrent] for
                      $[pricePerItem]
                      <br />
                      <br />
                      [tags]
                    </div>
                  </Link>
                </td>
                <td>
                  <Link className="link" to="/post-details">
                    <div className="post-title">Post [ID]: [itemName] - [status]</div>
                    <div className="post-content">
                      This post is led by [ownerName] and trades
                      [itemNumTarget] of [itemCurrent] for
                      $[pricePerItem]
                      <br />
                      <br />
                      [tags]
                    </div>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link className="link" to="/post-details">
                    <div className="post-title">Post [ID]: [itemName] - [status]</div>
                    <div className="post-content">
                      This post is led by [ownerName] and trades
                      [itemNumTarget] of [itemCurrent] for
                      $[pricePerItem]
                      <br />
                      <br />
                      [tags]
                    </div>
                  </Link>
                </td>
                <td>
                  <Link className="link" to="/post-details">
                    <div className="post-title">Post [ID]: [itemName] - [status]</div>
                    <div className="post-content">
                      This post is led by [ownerName] and trades
                      [itemNumTarget] of [itemCurrent] for
                      $[pricePerItem]
                      <br />
                      <br />
                      [tags]
                    </div>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link className="link" to="/post-details">
                    <div className="post-title">Post [ID]: [itemName] - [status]</div>
                    <div className="post-content">
                      This post is led by [ownerName] and trades
                      [itemNumTarget] of [itemCurrent] for
                      $[pricePerItem]
                      <br />
                      <br />
                      [tags]
                    </div>
                  </Link>
                </td>
                <td>
                  <Link className="link" to="/post-details">
                    <div className="post-title">Post [ID]: [itemName] - [status]</div>
                    <div className="post-content">
                      This post is led by [ownerName] and trades
                      [itemNumTarget] of [itemCurrent] for
                      $[pricePerItem]
                      <br />
                      <br />
                      [tags]
                    </div>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link className="link" to="/post-details">
                    <div className="post-title">Post [ID]: [itemName] - [status]</div>
                    <div className="post-content">
                      This post is led by [ownerName] and trades
                      [itemNumTarget] of [itemCurrent] for
                      $[pricePerItem]
                      <br />
                      <br />
                      [tags]
                    </div>
                  </Link>
                </td>
                <td>
                  <Link className="link" to="/post-details">
                    <div className="post-title">Post [ID]: [itemName] - [status]</div>
                    <div className="post-content">
                      This post is led by [ownerName] and trades
                      [itemNumTarget] of [itemCurrent] for
                      $[pricePerItem]
                      <br />
                      <br />
                      [tags]
                    </div>
                  </Link>
                </td>
              </tr>

            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default UserProfile;
