import { snakeToCamel, camelToSnake } from './format';

describe('Format snakecase to camelcase and vice versa', () => {
  it('should convert snakecase to camelcase json', () => {
    const json = {
      new_number: 5,
      new_object: {
        null_value: null,
        with_string: 'string',
      },
      with_date: new Date(),
    };

    const camelCaseJSON = snakeToCamel(json);
    const expectedJSON = {
      newNumber: 5,
      newObject: {
        nullValue: null,
        withString: 'string',
      },
      withDate: new Date(),
    };
    expect(camelCaseJSON).toEqual(expectedJSON);
  });

  it('should convert snakecase to camelcase json array', () => {
    const jsonArray = [
      {
        new_number: 5,
        new_object: {
          null_value: null,
          with_string: 'string',
        },
        with_date: new Date(),
      },
      {
        value_undefined: undefined,
      },
    ];

    const camelCaseJSONArray = snakeToCamel(jsonArray);
    const expectedJSONArray = [
      {
        newNumber: 5,
        newObject: {
          nullValue: null,
          withString: 'string',
        },
        withDate: new Date(),
      },
      { valueUndefined: undefined },
    ];
    expect(camelCaseJSONArray).toEqual(expectedJSONArray);
  });

  it('should convert camelcase to snakecase json', () => {
    const json = {
      newNumber: 5,
      newObject: {
        nullValue: null,
        withString: 'string',
      },
      withDate: new Date(),
    };
    const snakeCaseJSON = camelToSnake(json);
    const expectedJSON = {
      new_number: 5,
      new_object: {
        null_value: null,
        with_string: 'string',
      },
      with_date: new Date(),
    };

    expect(snakeCaseJSON).toEqual(expectedJSON);
  });
});
