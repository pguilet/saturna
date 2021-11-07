import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Component } from 'react';
import { connect, ConnectedProps, ConnectedComponent } from 'react-redux';
import { Roles } from '../actions/types';

interface RootState {
     auth: { role: String } | null | false; //auth is either null when not initialized, false when initialized but user is not identified and is true when identified.
     role: String;
}
interface Props extends PropsFromRedux {
     path: string;
     exact: boolean | undefined;
     component: ConnectedComponent<any, any>;
}

class GuardedRoute extends Component<Props> {
     renderContent(props: RouteComponentProps) {
          let Component = this.props.component;
          if (
               (!this.props.auth && this.props.auth !== null) ||
               (this.props.auth &&
                    this.props.role === Roles.ADMIN &&
                    this.props.auth.role !== this.props.role)
          ) {
               return <Redirect to="/login" />;
          } else if (this.props.auth) {
               return <Component {...props} />;
          }
          return '';
     }
     render() {
          return (
               <Route
                    exact={this.props.exact}
                    path={this.props.path}
                    render={(props) => this.renderContent(props)}
               />
          );
     }
}

const mapState = (state: RootState) => ({
     auth: state.auth,
     role: state.role,
});
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GuardedRoute);
