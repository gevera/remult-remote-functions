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

- ### Redirect issues 

Also, I have notice a strange behavior in routing in __/tasks__ endpoint

In case there are multiple tasks (more then 2-3) and if you visit each one of the tasks pages, the url will change but the page wont render and stay the same (/tasks)

For single task server load I've used both pg and and also remult with same result. Page wont load. I've used both default string in a href tag as well as route function from vite-plugin-kit-routes. 
