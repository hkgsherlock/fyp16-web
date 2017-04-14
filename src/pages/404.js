import React, {PureComponent} from 'react'
import { Link } from 'react-router'

class NotFound extends PureComponent {
    componentDidMount() {
        document.title = "404";
    }

    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '4em'}}>
                <img alt="404" style={{ width: 320 }} src="http://i1.kym-cdn.com/photos/images/newsfeed/001/042/619/4ea.jpg"/>
                <h1>{ '冇野係度喎 ¯\\_(ツ)_/¯' }</h1>
                <br/>
                <br/>
                <Link to="/">回到主頁</Link>
            </div>
        )
    }
}

export default NotFound;