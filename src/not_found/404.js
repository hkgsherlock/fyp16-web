import React, {PureComponent} from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

class NotFound extends PureComponent {
    render() {
        return (
            <DocumentTitle title="404">
                <div style={{ textAlign: 'center', paddingTop: '4em'}}>
                    <img alt="404" style={{ width: 320 }} src="http://i1.kym-cdn.com/photos/images/newsfeed/001/042/619/4ea.jpg"/>
                    <h1>{ 'Nothing here ¯\\_(ツ)_/¯' }</h1>
                    <br/>
                    <br/>
                    <Link to="/">Back to Home</Link>
                </div>
            </DocumentTitle>
        )
    }
}

export default NotFound;