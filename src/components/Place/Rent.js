import React, { Component } from "react";
import { DatePicker, message } from "antd";
import { Segment, Button, Icon } from "semantic-ui-react";
import { rent, messageRent } from "../../service";

const { RangePicker } = DatePicker;

class Rent extends Component {
  constructor() {
    super();
    this.state = {
      rent: {
        arrival: "",
        departure: ""
      }
    };
  }

  handleChange = e => {
    let { rent } = this.state;
    rent.place = this.props.place._id;
    rent.lessee = this.props.user._id;
    rent.arrival = new Date(e[0]._d);
    rent.departure = new Date(e[1]._d);

    this.setState({ rent: rent });
  };

  handleSubmit = e => {
    e.preventDefault();

    rent(this.state.rent).then(res => {
      let msg = {
        sender: res.rent.lessor,
        addressee: res.rent.lessee,
        title: "Solicitud de renta de espacio",
        comment: ""
      };
      messageRent(msg).then(res => {
        message.success(res.msg);
      });
      message.success(res.msg);
    });
  };

  render() {
    return (
      <Segment textAlign="left" style={{ marginTop: "25px" }}>
        <form onSubmit={this.handleSubmit}>
          <RangePicker
            placeholder={["Llegada", "Salida"]}
            onChange={this.handleChange}
          />
          <Button
            size="small"
            color="google plus"
            type="submit"
            style={{ marginLeft: "25px" }}
          >
            <Icon name="travel" /> Reservar
          </Button>
        </form>
      </Segment>
    );
  }
}

export default Rent;
