import React from 'react'
import PropTypes from 'prop-types'
import CONFIG from '../../../config'
import EditMember from '../../../components/edit/MemberForm';
import EditContest from '../../../components/edit/ContestForm';
import EditGroup from '../../../components/edit/GroupForm';
import EditInfringement from '../../../components/edit/InfringementForm';
import EditJudge from '../../../components/edit/JudgeForm';
import EditLocation from '../../../components/edit/LocationForm';
import EditOrganization from '../../../components/edit/OrganizationForm';
import EditResult from '../../../components/edit/ResultForm';

class EditEntity extends React.Component {
  static propTypes = {
    initData: PropTypes.func.isRequired,
    tables: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      status: CONFIG.S[0],
      tables: []
    };
  }

  initData() {
    fetch(CONFIG.ENDPOINTS.HOME)
      .then(response => response.json())
      .then(json => this.processing(json))
      .catch(e => console.log(e));
  }

  processing(response) {
    if (response.status.toLowerCase() == 'ok') {
      const tables = response['response']
      this.setState({ status: CONFIG.S[1], tables: tables })
      this.props.initData(tables)
    }
    else this.setState({ status: CONFIG.S[2] })
  }

  getById(table, id) {  
    let resultId = false;
    table.forEach((e, i) => {
      if(e.id == id) {
        resultId = i;
        return;
      }
    })
    return resultId;
  }

  render() {
    const { status } = this.state;
    const { id, table } = this.props.params;
    const tables = this.props.tables;
    if (tables && Object.keys(tables).length > 0 && tables[table] && (this.getById(tables[table], id) || this.getById(tables[table], id) === 0)) {
      const correctId = this.getById(tables[table], id);
      console.log(tables[table], id)
      console.log(correctId);
      switch (table) {
        case "members":
          return (<EditMember id={correctId} entity={tables[table][correctId]} />);
        case "contests":
          return (<EditContest id={correctId} entity={tables[table][correctId]} />);
        case "groups":
          return (<EditGroup id={correctId} entity={tables[table][correctId]} />);
        case "infringements":
          return (<EditInfringement id={correctId} entity={tables[table][correctId]} />);
        case "judges":
          return (<EditJudge id={correctId} entity={tables[table][correctId]} />);
        case "locations":
          return (<EditLocation id={correctId} entity={tables[table][correctId]} />);
        case "organizations":
          return (<EditOrganization id={correctId} entity={tables[table][correctId]} />);
        case "results":
          return (<EditResult id={correctId} entity={tables[table][correctId]} />);
        default:
          return (<div className="alert alert-warning" role="alert"> Я не смогла найти таблицу по запросу( </div>);
      }
    } else if (status == CONFIG.S[0]) {
      this.initData();
      return <div className="alert alert-warning" role="alert"> Подключаюсь к БД, ожидайте ..... </div>;
    } else if(status == CONFIG.S[2]) {
      return <div className="alert alert-danger" role="alert"> У меня не удалось подключиться к серверу с БД ( </div>;
    } else {
      return (<div className="alert alert-warning" role="alert"> Я не смогла найти таблицу или запись по запросу( </div>);
    }
  }
}

export default EditEntity
