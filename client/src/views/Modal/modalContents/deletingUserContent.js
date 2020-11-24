import React , {Component} from 'react';
import Button from 'components/CustomButton/CustomButton';
import Aux from '../../../hoc/Auxillary/Auxillary';

class deleteUserModal extends Component {
        render() {
            const msg = `Are you sure you want to delete the user ?`;
            const name = 'Bysani R Navaneeth';
            const email = 'brn14@iitbbs.ac.in';
          
            return (
                <Aux>
                    <p>{msg}</p>
                    <hr />
                    <table>
                        <tbody>
                        <tr>
                        <td><b>Name :   </b></td>
                        <td>{name}</td>
                        </tr>
                        <tr>
                        <td><b>Email :</b></td>
                        <td>{email}</td>
                        </tr> 
                        </tbody>
                    </table>
                    <br />
                    <Button bsStyle="danger" fill block>Yes, Go ahead</Button> 
                    <Button bsStyle="success" fill block>Nope, Go back</Button>
                </Aux>
            )
        }
}

export default deleteUserModal;