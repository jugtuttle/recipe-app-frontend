import React, { Component } from 'react';
import { Menu, Dropdown, Input, Button, Sticky, Image } from 'semantic-ui-react'
import {Link} from  'react-router-dom';
import logo2 from '../images/logo-small.png'

class NavBar extends Component{


  uniqCategories = () => {
    const uniq = this.props.recipes.map(recipe => recipe.category).filter((v, i, a) => a.indexOf(v) === i).sort().map(category => category)
      uniq.splice(0, 1, "All Categories")
      return uniq.map(category => <div className="item"><li>{category}</li></div>)
  }

  uniqAreas = () => {
    const uniq = this.props.recipes.map(recipe => recipe.area).filter((v, i, a) => a.indexOf(v) === i).sort().map(area => area)
      uniq.splice(0, 1, "All Areas")
      return uniq.map(area => <div className="item"><li>{area}</li></div>)
  }

  handleCategorySelect = (e) => {
    const category = e.target.innerText
    this.props.changeCategory(category)
  }

  handleAreaSelect = (e) => {
    const area = e.target.innerText
    this.props.changeArea(area)
  }

  handleChange = e => {
    this.props.onSearch(e)
  }


  
  render() {    
    const token = localStorage.getItem("token")

    return(
      <div className="nav-bar">       
      <Sticky style={{padding: "20px"}}>                                                                 
        <Menu
          size='massive'
          attached='top'
          tabular
          margin-bottom="10em"
          style={{ backgroundColor: '#fff', paddingTop: '1em' }}>         
          <Dropdown item text={this.props.category}>
            <Dropdown.Menu>
                <Dropdown.Item  onClick={(e) => this.handleCategorySelect(e)}>{this.uniqCategories()}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text={this.props.area}>
            <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => this.handleAreaSelect(e)}>{this.uniqAreas()}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Menu.Item>
            <Input className='icon' value={this.props.search} icon='search' onChange={this.handleChange}  placeholder='Search...' />
          </Menu.Item>
        
          <Menu.Item>
          </Menu.Item>

          <Menu.Item>
            {token ? <Image src={logo2} width="130px" centered/> : null}
          </Menu.Item>
              <div className="right menu">
        <Menu>
            <Menu.Item floated='right'>
              <Link to="/"><Button>Home</Button></Link>
            </Menu.Item>
            
            <Menu.Item floated='right'>
              {token && 
              <Link to="/my-page">
                <Button>{`${this.props.user.username}'s Page`}</Button>
              </Link>}
            </Menu.Item>

            <Menu.Item floated='right'>
              {(token
              ) ? ( 
              <Link to="/">
                <Button onClick={this.props.onLogout}>Logout</Button>
              </Link>
              ) : (
              <Link to="/login">
                <Button>Log In</Button>
              </Link> 
              ) }
            </Menu.Item>
        </Menu>
          </div>
        </Menu>
      </Sticky>
      </div> 
    )
  }
}

export default NavBar;
