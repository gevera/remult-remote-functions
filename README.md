# About the project
This project aims at exploring Svelte's new Remote Functions and how well Remult integrates with them

Latest version's are used for SvelteKit and Remult. 2.48.4 and 3.2.3 respectively


## Findings and peculiarities:

- ### Remult's standard schema

In ```src/lib/services/tasks.remote.ts``` we have a query remote function that should return a single task. As we can see the standardSchema here works

```ts
export const getTask = query(
	standardSchema(repo(Task), 'id'), // Standard Schema in query works
	async ({ id }) => {
		const task = await withRemultApi(Task, (task) => task.findFirst({ id }));
		if (!task) error(404, 'Not found');
		return task;
	}
);
```

However, whenever we try to do the same thing in a form, say in **createTask** function on line 29 the code breaks

```ts
export const createTask = form(
	standardSchema(repo(Task), 'title'),
	async ({ title }) => {
		await withRemultApi(Task, async (task) => {
			const data = await task.insert({ title });
			console.log(data);
		});

		await getAllTasks();
	}
);
```

Here are the errors:

```bash
No overload matches this call.
  Overload 1 of 3, '(validate: "unchecked", fn: (data: RemoteFormInput, invalid: Invalid<RemoteFormInput>) => unknown): RemoteForm<RemoteFormInput, unknown>', gave the following error.
    Argument of type 'RemultEntitySchema<Task, ["title"]>' is not assignable to parameter of type '"unchecked"'.
  Overload 2 of 3, '(validate: StandardSchemaV1<RemoteFormInput, Record<string, any>>, fn: (data: Record<string, any>, invalid: Invalid<RemoteFormInput>) => unknown): RemoteForm<...>', gave the following error.
    Argument of type 'RemultEntitySchema<Task, ["title"]>' is not assignable to parameter of type 'StandardSchemaV1<RemoteFormInput, Record<string, any>>'.
      The types of '"~standard".types' are incompatible between these types.
        Type 'Types<Partial<Task>, Pick<Task, "title">> | undefined' is not assignable to type 'Types<RemoteFormInput, Record<string, any>> | undefined'.
          Type 'Types<Partial<Task>, Pick<Task, "title">>' is not assignable to type 'Types<RemoteFormInput, Record<string, any>>'.
            Types of property 'input' are incompatible.
              Type 'Partial<Task>' is not assignable to type 'RemoteFormInput'.
                Property 'createdAt' is incompatible with index signature.
                  Type 'Date' is not assignable to type 'MaybeArray<string | number | boolean | RemoteFormInput | File>'.
                    Type 'Date' is not assignable to type 'RemoteFormInput'.
                      Index signature for type 'string' is missing in type 'Date'.ts(2769)
```


# TODO:

- Add Better Auth
- Add S3 File Uploads
- Add Background Jobs
- Add Telegram Bot for Notifications
