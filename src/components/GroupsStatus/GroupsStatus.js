import React, { Component } from 'react';
import axios from 'axios';
import teamMapping from '../../data/teamMapping';

class GroupsStatus extends Component {
  state = {
    groups: {},
  };

  componentDidMount() {
    axios.get('teams/results').then((result) => {
      const sortedData = [...result.data].sort((a, b) => {
        if (a.group_letter < b.group_letter) {
          return -1;
        }
        if (a.group_letter > b.group_letter) {
          return 1;
        }

        if (a.points < b.points) {
          return 1;
        }
        if (a.points > b.points) {
          return -1;
        }

        if (a.goal_differential < b.goal_differential) {
          return 1;
        }
        if (a.goal_differential > b.goal_differential) {
          return -1;
        }

        return 0;
      });

      let groups = {};
      sortedData.forEach((group) => {
        if (!groups[group.group_letter]) {
          groups[group.group_letter] = [group];
        } else {
          groups[group.group_letter].push(group);
        }
      });

      this.setState({
        groups,
      });
    })
  }

  render() {
    const groupsTemplate = Object.keys(this.state.groups).map((groupKey) => (
      <div
        key={groupKey}
        className="group"
      >
        <h4>Group {groupKey}</h4>
        <table className="group-table">
          <thead>
          <tr>
            <th>
              Team
            </th>
            <th>
              Who
            </th>
            <th>
              Games Played
            </th>
            <th>
              Goal differential
            </th>
            <th>
              Points
            </th>
          </tr>
          </thead>
          <tbody>
          {this.state.groups[groupKey].map((team) => (
            <tr key={team.id}>
              <td>
                {team.country}
              </td>
              <td>
                {teamMapping[team.country]}
              </td>
              <td>
                {team.games_played}
              </td>
              <td>
                {team.goal_differential}
              </td>
              <td>
                {team.points}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    ));

    return (
      <div>
        <h1>Groups:</h1>
        <div className="groups-container">
          {groupsTemplate}
        </div>
      </div>
    )
  }
}

export default GroupsStatus;
