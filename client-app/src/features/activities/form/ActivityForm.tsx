import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { ActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
  title: isRequired({ message: "Nazwa randki jest wymagana" }),
  category: isRequired("Kategoria jest wymagana"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({ message: "Opis musi mieć conajmniej 5 liter" })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Time"),
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => {
          setActivity(new ActivityFormValues(activity));
        })
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Tytuł"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Opis"
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  options={category}
                  name="category"
                  placeholder="Kategoria"
                  value={activity.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Data"
                    value={activity.date}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="czas"
                    value={activity.time}
                  />
                </Form.Group>
                <Field
                  name="city"
                  placeholder="Miasto"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Miejsce"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  disabled={loading || invalid || pristine}
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Dodaj"
                />
                <Button
                  disabled={loading}
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  floated="right"
                  type="button"
                  content="Anuluj"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
