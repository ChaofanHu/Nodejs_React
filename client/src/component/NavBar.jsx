import React, { useContext } from 'react'
import Logo from '../imgs/LOGO.png'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/authVerification'

const NavBar = () => {

  const {user, logout} = useContext(AuthContext);


  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='LOGO'></img>
          </Link>
        </div>
        <div className='links'>
          <Link className='links' to='/?cat=art'><h6>ART</h6></Link>
          <Link className='links' to='/?cat=science'><h6>Science</h6></Link>
          <Link className='links' to='/?cat=technology'><h6>Technology</h6></Link>
          <Link className='links' to='/?cat=cinema'><h6>Cinema</h6></Link>
          <Link className='links' to='/?cat=design'><h6>Design</h6></Link>
          <Link className='links' to='/?cat=Food'><h6>Food</h6></Link>
          <span>{user?.username}</span>
          {user ?<span onClick={logout}> <Link className='links' to='/'>Logout</Link></span> : <Link className='links' to='/login'>Login</Link>}

          <span className='write'>
            {user ? (
              <Link className='links' to='/write'>
                Write
              </Link>
            ) : (
              <span>Write</span>
            )}
          </span>
        </div>

      </div>

    </div>
  )
}

export default NavBar