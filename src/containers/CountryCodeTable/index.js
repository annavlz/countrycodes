import { connect } from "react-redux";

import { CountryCodeTable } from "../../components";
import { appInitialised } from "../../state/actions";
import { getExternalData, getFilters } from "../../state/selectors";

function mapStateToProps(state) {
  return {
    externalData: getExternalData(state),
    filters: getFilters(state) //as soon as this prop changed we rerender the tables
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initialiseApp: () => dispatch(appInitialised())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryCodeTable);
