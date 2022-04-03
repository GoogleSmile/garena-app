import React, { useState, useEffect } from 'react';
import './App.css';
import './app.scss';
import Scape from './assets/images/scape.png';
import LOGO from './assets/images/logo.png';
import ROLE from './assets/images/img-1.jpg';

function App() {
  const [isMaskVisible, setIsMaskVisible] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  useEffect(() => {
    const handle = () => {
      if (window.orientation === 180 || window.orientation === 0) {
        setIsMaskVisible(true);
      } else {
        setIsMaskVisible(false);
      }
    };
    handle();
    window.addEventListener(
      'onorientationchange' in window ? 'orientationchange' : 'resize',
      handle,
      false
    );

    return () => {
      window.removeEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        handle,
        false
      );
    };
  }, []);

  function ajax(option) {
    var str = objToString(option.data);
    var xmlhttp, timer;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    if (option.type.toLowerCase() === 'get') {
        xmlhttp.open(option.type, option.url + "?t=" + str, true);
        xmlhttp.send();
    } else {
        xmlhttp.open(option.type, option.url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(str);
    }
    xmlhttp.onreadystatechange = function () {
        clearInterval(timer);
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status == 304) {
                option.success(xmlhttp);
            } else {
                option.error(xmlhttp);
            }
        }
    }
    function objToString(data) {
        data.t = new Date().getTime();
        var res = [];
        for (var key in data) {
            res.push(encodeURIComponent(key) + " = " + encodeURIComponent(data[key]));
        }
        return res.join("&");
    }
  }

  return (
    <>
      <div className='App'>
        <div className='head'>
          <ul className={showLinks ? 'moble-navs' : null}>
            <li>HOME</li>
            <li>NEWS</li>
            <li>WEAPONS</li>
            <li>MAP</li>
            <li>CHARACTERS</li>
            <li>WALLPAPER</li>
          </ul>
          <div
            className='nav-btn'
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </div>
        <img className='logo' src={LOGO} alt='LOGO' />

        <div className='main'>
          <h3>CHARACTER</h3>
          <ul>
            <li>
              <img src={ROLE} alt='角色' />
            </li>
            <li>
              <img src={ROLE} alt='角色' />
            </li>
            <li>
              <img src={ROLE} alt='角色' />
            </li>
            <li>
              <img src={ROLE} alt='角色' />
            </li>
            <li>
              <img src={ROLE} alt='角色' />
            </li>
            <li>
              <img src={ROLE} alt='角色' />
            </li>
          </ul>
        </div>
      </div>
      {isMaskVisible && (
        <div className='mask'>
          <div className='img-tips'>
            <img src={Scape} alt='picutre' />
            <div className='tips'>请横向浏览页面</div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
