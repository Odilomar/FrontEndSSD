import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

import Header from "../../components/Header";
// import ReactSelectComponent from "../../components/Select";
import Select from "react-select";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.location.state
        ? this.props.location.state.message
        : "",
    };
  }
  signIn = () => {
    const data = { nome: this.nome, role: this.role };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    fetch("https://localhost:44307/v1/account/login", requestInfo)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Login inválido...");
      })
      .then((token) => {
        localStorage.setItem("token", token);
        this.props.history.push("/admin");
        return;
      })
      .catch((e) => {
        this.setState({ message: e.message });
      });
  };

  handleSelectChange = (selectedOption) => {
    console.log(selectedOption);
  };

  render() {
    return (
      <div className="col-md-6">
        <Header title="Sistema de Segurança Digital" />

        <hr className="my-3" />
        {this.state.message !== "" ? (
          <Alert color="danger" className="text-center">
            {" "}
            {this.state.message}{" "}
          </Alert>
        ) : (
          ""
        )}
        <Form>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input
              type="text"
              id="nome"
              onChange={(e) => (this.nome = e.target.value)}
              placeholder="Informe seu nome"
            />
          </FormGroup>
          <FormGroup>
            <Label for="role">Setor</Label>
            <Select
              options={[
                { value: "admin", label: "Administrador do Sistema" },
                { value: "super", label: "Super Usuário" },
                { value: "tecnico", label: "Técnico" },
              ]}
              placeholder="Selecione aqui"
              onChange={(e) => (this.role = e.value)}
            />
          </FormGroup>
          <Button color="primary" block onClick={this.signIn}>
            {" "}
            Entrar{" "}
          </Button>
        </Form>
      </div>
    );
  }
}
