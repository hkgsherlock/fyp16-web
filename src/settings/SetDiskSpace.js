import React, {Component} from 'react'
import {Breadcrumb, Header, Progress, Segment, Statistic} from "semantic-ui-react";
import {Link} from "react-router";

class SetDiskSpace extends Component {
    render() {
        return (
            <Segment basic>
                <Breadcrumb size='big'>
                    <Breadcrumb.Section>
                        <Link to="/settings">
                            Settings
                        </Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section >
                        System
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron'/>
                    <Breadcrumb.Section active>
                        Disk usage and spaces
                    </Breadcrumb.Section>
                </Breadcrumb>
                <Segment basic>
                    <Header as="h2">
                        Total disk usage
                    </Header>
                    <Statistic.Group widths={4} size="small">
                        <Statistic label='Total GB' value='29.07' />
                        <Statistic label='Used' value='4.79' />
                        <Statistic label='Available' value='22.93' />
                        <Statistic label='Used %' value='18%' />
                    </Statistic.Group>
                    <Segment.Group>
                        <Segment>
                            <Header as="h3">
                                <code>
                                    /dev/root
                                </code>
                            </Header>
                            <Progress progress percent={18} />
                            <Statistic.Group widths={4} size="small">
                                <Statistic label='Total GB' value='29.04' />
                                <Statistic label='Used' value='4.77' />
                                <Statistic label='Available' value='22.89' />
                                <Statistic label='Used %' value='18%' />
                            </Statistic.Group>
                        </Segment>

                        <Segment>
                            <Header as="h3">
                                <code>
                                    /dev/mmcblk0p1
                                </code>
                            </Header>
                            <Progress progress percent={34} />
                            <Statistic.Group widths={4} size="small">
                                <Statistic label='Total GB' value='63' />
                                <Statistic label='Used' value='21' />
                                <Statistic label='Available' value='42' />
                                <Statistic label='Used %' value='34%' />
                            </Statistic.Group>
                        </Segment>
                    </Segment.Group>
                </Segment>
            </Segment>
        );
    }
}

export default SetDiskSpace;