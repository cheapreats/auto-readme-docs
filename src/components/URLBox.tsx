import React from 'react';
import Card from './reusable/Card';
import Input from './reusable/Input';
import CustomButton from './reusable/CustomButton';

const URLBox: React.FC = () => (
  <Card>
    <div className="row">
      <div className="col">
        <h1>Swegg App Title</h1>
      </div>
    </div>
    <div className="row">
      <div className="col" style={{ textAlign: 'center' }}>
        <Input placeholder="Enter a public GitHub URL" />
        <CustomButton value="Go" />
      </div>
    </div>
  </Card>
);

export default URLBox;
