/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Cypress.Commands.add('login', (username: string, password: string) => {
//     cy.log(`Logging in as ${username}`);
//     const client_id = Cypress.env('auth0_client_id');
//     const client_secret = Cypress.env('auth0_client_secret');
//     const audience = Cypress.env('auth0_audience');
//     const scope = Cypress.env('auth0_scope');

//     cy.request({
//       method: 'POST',
//       url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
//       body: {
//         grant_type: 'password',
//         username,
//         password,
//         audience,
//         scope,
//         client_id,
//         client_secret,
//       },
//     }).then(({ body }) => {
//       const claims = body.id_token;
//       const {
//         nickname,
//         name,
//         picture,
//         updated_at,
//         email,
//         email_verified,
//         sub,
//         exp,
//       } = claims;

//       const item = {
//         body: {
//           ...body,
//           decodedToken: {
//             claims,
//             user: {
//               nickname,
//               name,
//               picture,
//               updated_at,
//               email,
//               email_verified,
//               sub,
//             },
//             audience,
//             client_id,
//           },
//         },
//         expiresAt: exp,
//       };

//       window.localStorage.setItem('auth0Cypress', JSON.stringify(item));

//       cy.visit('/');
//     });
//   },
// );
