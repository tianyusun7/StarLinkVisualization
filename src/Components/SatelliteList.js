import React, { Component } from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from '../assets/images/satellite.svg';

class SatelliteList extends Component {
    constructor() {
        super();
        this.state = {
            selected: [],
            isLoad: false,
        };
    }

    onChange = (e) => {
        const { dataInfo, checked } = e.target;
        // get active sat info
        const { selected } = this.state;
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({
            selected: list,
        });
    };

    addOrRemove = (item, status, list) => {
        const found = list.some((entry) => entry.satid === item.satid); // some method under Array.prototype
        if (status && !found) {
            list = [...list, item]; // add item to list
        }

        if (!status && found) {
            list = list.filter((entry) => {
                return entry.satid !== item.satid;
            });
        }
        console.log(list);
        return list;
    };

    onShowSatMap = () => {
        this.props.onShowMap(this.state.selected);
    };

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        const { selected } = this.state;

        return (
            <div className="sat-list-box">
                <div className="btn-container">
                    <Button
                        className="sat-list-btn"
                        type="primary"
                        disabled={selected.length === 0} //disable track when no sat selected
                        onClick={this.onShowSatMap}
                    >
                        Track
                    </Button>
                </div>
                <hr />

                {isLoad ? (
                    <div className="spin-box">
                        <Spin tip="Loading..." size="large" />
                    </div>
                ) : (
                    <List
                        className="sat-list"
                        itemLayout="horizontal"
                        size="small"
                        dataSource={satList}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Checkbox dataInfo={item} onChange={this.onChange} />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} src={satellite} />}
                                    title={<p>{item.satname}</p>}
                                    description={`Launch Date: ${item.launchDate}`}
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>
        );
    }
}

export default SatelliteList;
