import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, InputGroup, FormControl, Tabs, Tab } from 'react-bootstrap';


class InstgramFeed extends Component {
    render() {
        const {token, handleAuthorization, tokenFieldOnChange, deleteToken, generateFeed } = this.props;
        return (
            <React.Fragment>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Access Token"
                        aria-label="Access Token"
                        aria-describedby="basic-addon2"
                        value={token}
                        onChange={tokenFieldOnChange.bind(this)}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={handleAuthorization.bind(this)}
                        >
                            Get Token
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={deleteToken.bind(this)}
                        >
                            Delete Token
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <Button
                    variant="outline-primary"
                    onClick={generateFeed.bind(this)}
                >
                    Generate Feed
                </Button>

            </React.Fragment>

        )
    }
}

export default InstgramFeed;