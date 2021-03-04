import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

class SelectView extends React.Component {
    render() {
        return (
            <Container className="text-center pt-3">
                <table>
                    <tr>
                        <td>⏳</td>
                        <td align="left"><Link to="/e"> Emphemeral view</Link></td>
                    </tr>
                    <tr>
                        <td>♾</td>
                        <td align="left"><Link to="/p"> Persistant view</Link></td>
                    </tr>
                </table>
            </Container>
        )
    };
};

export default SelectView;