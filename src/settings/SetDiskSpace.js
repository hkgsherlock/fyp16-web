import React, {Component} from 'react'
import {Breadcrumb, Header, Progress, Segment, Statistic} from "semantic-ui-react";
import {Link} from "react-router";

class SetDiskSpace extends Component {
    state = {
        loading: false,
        unit: 'MB',
        total: '...',
        used: '...',
        available: '...',
        use_percent: '...',
        disks: []
    };

    componentDidMount() {
        this.reloadStat();
    }

    async reloadStat() {
        this.setState({loading: true});
        let result;
        result = await fetch('http://localhost:5000/api/diskusage');
        let json = await result.json();
        this.setState({loading: false});
        if (result.ok) {
            this.setState({
                unit: json.unit,
                total: json.total,
                used: json.used,
                available: json.available,
                use_percent: json.use_percent,
                disks: json.disks
            });
        } else {
        }
    }

    render() {
        const unit = this.state.unit;
        return (
            <Segment basic loading={this.state.loading}>
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
                        <Statistic label={ 'Total ' + unit } value={this.state.total} />
                        <Statistic label='Used' value={this.state.used} />
                        <Statistic label='Available' value={this.state.available} />
                        <Statistic label='Used %' value={this.state.use_percent} />
                    </Statistic.Group>
                    <Segment.Group>
                        {this.state.disks.map(function(e, idx){
                            return (
                                <Segment>
                                    <Header as="h3">
                                        <code>
                                            {e.filesystem}
                                        </code>
                                        <Header.Subheader>
                                            Mounted on <code>{e.mounted_on}</code>
                                        </Header.Subheader>
                                    </Header>
                                    <Progress progress percent={18} />
                                    <Statistic.Group widths={4} size="small">
                                        <Statistic label={ 'Total ' + unit } value={e.total} />
                                        <Statistic label='Used' value={e.used} />
                                        <Statistic label='Available' value={e.available} />
                                        <Statistic label='Used %' value={e.use_percent} />
                                    </Statistic.Group>
                                </Segment>
                            );
                        })}
                    </Segment.Group>
                </Segment>
            </Segment>
        );
    }
}

export default SetDiskSpace;