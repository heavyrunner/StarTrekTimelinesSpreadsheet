import React, { Component } from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';
import { Link } from 'office-ui-fabric-react/lib/Link';

import { SkillCell } from './SkillCell.js';

import { groupBy, sortItems, columnClick } from '../utils/listUtils.js';

export class CrewList extends React.Component {
	constructor(props) {
		super(props);

		var items = props.data;
		items = sortItems(items, 'max_rarity');

		const _columns = [
			{
				key: 'icon',
				name: '',
				minWidth: 50,
				maxWidth: 50,
				fieldName: 'name',
				onRender: (item) => {
					return (<Image src={item.iconUrl} width={50} height={50} imageFit={ImageFit.contain} />);
				}
			},
			{
				key: 'short_name',
				name: 'Name',
				minWidth: 80,
				maxWidth: 100,
				isResizable: true,
				fieldName: 'short_name',
				onRender: (item) => {
					return (<Link href={'https://stt.wiki/wiki/' + item.name.split(' ').join('_')} target='_blank'>{item.short_name}</Link>);
				}
			},
			{
				key: 'name',
				name: 'Full name',
				minWidth: 100,
				isResizable: true,
				fieldName: 'name'
			},
			{
				key: 'level',
				name: 'Level',
				minWidth: 30,
				maxWidth: 80,
				isResizable: true,
				fieldName: 'level'
			},
			{
				key: 'max_rarity',
				name: 'Rarity',
				fieldName: 'max_rarity',
				minWidth: 70,
				maxWidth: 100,
				isResizable: true,
				isSorted: true,
				isSortedDescending: false,
				onRender: (item) => {
					return (
						<Rating
							min={1}
							max={item.max_rarity}
							rating={item.rarity}
						/>
					);
				},
				isPadded: true
			},
			{
				key: 'frozen',
				name: 'Frozen',
				minWidth: 16,
				maxWidth: 16,
				iconName: 'Snow',
				isIconOnly: true,
				fieldName: 'frozen',
				onRender: (item) => {
					if (item.frozen)
						return (<Icon iconName='Snow' />);
					else
						return (<p />);
				}
			},
			{
				key: 'command_skill',
				name: 'Command',
				minWidth: 70,
				maxWidth: 100,
				isResizable: true,
				fieldName: 'command_skill',
				onRender: (item) => {
					return (<SkillCell skill={item.command_skill} />);
				}
			},
			{
				key: 'diplomacy_skill',
				name: 'Diplomacy',
				minWidth: 70,
				maxWidth: 100,
				isResizable: true,
				fieldName: 'diplomacy_skill',
				onRender: (item) => {
					return (<SkillCell skill={item.diplomacy_skill} />);
				}
			},
			{
				key: 'engineering_skill',
				name: 'Engineering',
				minWidth: 75,
				maxWidth: 100,
				isResizable: true,
				fieldName: 'engineering_skill',
				onRender: (item) => {
					return (<SkillCell skill={item.engineering_skill} />);
				}
			},
			{
				key: 'medicine_skill',
				name: 'Medicine',
				minWidth: 70,
				maxWidth: 100,
				isResizable: true,
				fieldName: 'medicine_skill',
				onRender: (item) => {
					return (<SkillCell skill={item.medicine_skill} />);
				}
			},
			{
				key: 'science_skill',
				name: 'Science',
				minWidth: 70,
				maxWidth: 100,
				isResizable: true,
				fieldName: 'science_skill',
				onRender: (item) => {
					return (<SkillCell skill={item.science_skill} />);
				}
			},
			{
				key: 'security_skill',
				name: 'Security',
				minWidth: 70,
				maxWidth: 100,
				isResizable: true,
				fieldName: 'security_skill',
				onRender: (item) => {
					return (<SkillCell skill={item.security_skill} />);
				}
			},
			{
				key: 'traits',
				name: 'Traits',
				minWidth: 120,
				isResizable: true,
				fieldName: 'traits'
			}
		];

		this.state = {
			items: items,
			columns: _columns,
			groups: groupBy(items, 'max_rarity'),
			groupedColumn: 'max_rarity',
			isCompactMode: true
		};

		this._onColumnClick = this._onColumnClick.bind(this);
	}

	render() {
		let { columns, isCompactMode, items, groups } = this.state;

		return (
			<div className='data-grid' data-is-scrollable='true'>
				<DetailsList
					items={items}
					groups={groups}
					columns={columns}
					setKey='set'
					selectionMode={SelectionMode.none}
					layoutMode={DetailsListLayoutMode.justified}
					onColumnHeaderClick={this._onColumnClick}
				/>
			</div>
		);
	}

	_onColumnClick(ev, column) {
		this.setState(columnClick(this.state.items, this.state.columns, column));
	}

	getGroupedColumn() {
		return this.state.groupedColumn;
	}

	setGroupedColumn(groupedColumn) {
		if (groupedColumn == '')
			this.setState({ groupedColumn: '', groups: null });
		else
			this.setState({ groupedColumn: groupedColumn, groups: groupBy(this.state.items, groupedColumn) });
	}
}
