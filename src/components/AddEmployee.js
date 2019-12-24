import React from 'react'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  
  import { addEmployees } from '../actions/employeesActions'

  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  
  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  
  class AddEmployee extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            addEmployees(values)
            window.location.reload()
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  






      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="First Name">
            {getFieldDecorator('firstName', {
           rules: [
            {
         pattern: '^[A-Za-z]{3}',
        required: true,
        message: 'Please input your firstName!',
      }]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Last Name">
            {getFieldDecorator('lastName', {
           rules: [
            {
         pattern: '^[A-Za-z]{3}',
        required: true,
        message: 'Please input your lastName!',
      }]
            })(<Input />)}
          </Form.Item>
          
          <Form.Item label="Email">
            {getFieldDecorator('email', {
           rules: [
            {
                type: 'email',
              required: true,
              message: 'Please input your email!',
            }
          ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Phone">
            {getFieldDecorator('phone', {
          rules: [
              {
           pattern: '^[0-9]*\\-[0-9]*$',
          required: true,
          message: 'Please input your phone number',
        }]
            })(<Input placeholder="0000-111" />)}
          </Form.Item>
          
          <Form.Item label="Hire Date">
            {getFieldDecorator('hireDate', {
            rules: [
                {
             pattern: '^[0-9]*\\-[0-9]*\\-[0-9]*$',
            required: true,
            message: 'Please input your hireDate!',
          }]
            })(<Input placeholder="2017-12-31" />)}
          </Form.Item>

          <Form.Item label="Salary">
            {getFieldDecorator('salary', {
          rules: [
            {
         pattern: '^[1-9][0-9]*$',
        required: true,
        message: 'Please input your salary!',
      }]
            })(<Input />)}
          </Form.Item>
          
          <Form.Item label="Manager Id">
            {getFieldDecorator('managerId', {
          
            })(<Input />)}
          </Form.Item>

          <Form.Item label="department Id">
             {getFieldDecorator('departmentId', {
          
            })(<Input />)}
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedAddEmployee = Form.create({ name: 'SubmitEmployee' })(AddEmployee);

  export default WrappedAddEmployee