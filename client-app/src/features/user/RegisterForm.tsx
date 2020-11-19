import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { Form, Button, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import DateInput from "../../app/common/form/DateInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import SelectInput from "../../app/common/form/SelectInput";
import { gender } from "../../app/common/options/genderOptions";

const validate = combineValidators({
  firstName: isRequired("Imię"),
  lastName: isRequired("Nazwisko"),
  email: isRequired("Email"),
  password: isRequired("Hasło"),
  userDescription: isRequired("Opis"),
  userGender: isRequired("Płeć"),
  birthDate: isRequired("Data urodzenia"),
  userCity: isRequired("Miejscowość"),
  interests: isRequired("Zainteresowania"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Rejestracja"
            color="red"
            textAlign="center"
          />
          <Header as="h3" content="Dane konta" color="red" textAlign="center" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Hasło"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <Header
            as="h3"
            content="Dane postaci"
            color="red"
            textAlign="center"
          />
          <Form.Group widths="equal">
            <Field
              name="firstName"
              component={TextInput}
              placeholder="Imię postaci"
            />
            <Field
              name="lastName"
              component={TextInput}
              placeholder="Nazwisko postaci"
            />
          </Form.Group>
          <Field
            options={gender}
            name="userGender"
            placeholder="Płeć postaci"
            component={SelectInput}
          />
          <Field
            name="userCity"
            component={TextInput}
            placeholder="Miejsce zamieszkania postaci"
          />
          <Field
            component={DateInput}
            name="birthDate"
            date={true}
            placeholder="Data urodzenia postaci"
          />
          <Field
            name="userDescription"
            component={TextAreaInput}
            rows={3}
            placeholder="Opis postaci"
          />
          <Field
            name="interests"
            component={TextInput}
            placeholder="Zainteresowania postaci (oddzielić przecinkiem)"
          />
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="red"
            content="Zarejestruj"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
