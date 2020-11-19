import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Ups - szukaliśmy wszędzie gdzie się dało, ale nie znaleźliśmy tej strony.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Wróć do strony randek
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;