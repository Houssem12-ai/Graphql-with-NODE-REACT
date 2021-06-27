const graphql = require('graphql');
const _ = require('lodash')
const mongoose = require('mongoose')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const Author = require('../Models/Author')
const Book = require('../Models/Book')

//"
mongoose.connect("mongodb+srv://user:hossprog@cluster0.6xwrc.mongodb.net/NGL?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true } )
mongoose.connection.then(() => {
    console.log("alright");
}).catch((err) => {
    console.log(err);
});


/* const books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1',author_id : "1"},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2',author_id : "2"},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3',author_id : "3"}
]

const authors =  [
  {name: 'Patrick Rothfuss', age: 44, id:"1"},
  {name: 'Brandon Sanderson', age: 42, id:"2"},
  {name: 'Terry Pratchett', age: 66, id:"3"},
] */



/* 
{
  book(id:1){
    author {
      id
      name
    }
  }
}

 */
const BookTypee = new GraphQLObjectType({
    'name': 'Bookee',
    fields: () => ({//still not understanding how this one will decrease the reference errors
        id: { type: GraphQLID },
        authorus: {
            type: new graphql.GraphQLList(AuthorType),
            resolve(parent, args) {
                //console.log(parent.author_id)
                //return authors;
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    'name': 'Book',
    fields: () => ({//still not understanding how this one will decrease the reference errors
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return  Author.findById(parent.author_id)//lookiing for anything with this id    
            //return _.find(authors, { id: parent.author_id });
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    'name': 'Author',
    fields: () => ({    //still not understanding how this one will decrease the reference errors
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books : {type:GraphQLList(AuthorType)}
    }),
    resolve(parent, args) {
        return Book.findById({id : parent.id})
    }
})


// we won't do there root query because we don't care too much about order !!! whut ???

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById({id : args.id}) // was i able to do .findbyId(args.id)
                //console.log(args.id)
                //here we write code to query from db and other sources
                //return _.find(books, { id: args.id });
            }
        },booka: {
            type: BookTypee,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //console.log(args.id)
                //here we write code to query from db and other sources
                //return _.find(books, { id: args.id });
            }
        }, author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById({id : args.id})
                //console.log(args.id)
                //here we write code to query from db and other sources
                //return _.find(authors, { id: args.id });
            }
        }, books: {
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args) {
                //return books
                return Book.find({});
            }
        }, authors: {
            type: new graphql.GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        },book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.find({});
                //console.log(args.id)
                //here we write code to query from db and other sources
                //return _.find(books, { id: args.id });
            }
        }
    }
})


 const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type : AuthorType,
            args: {
                name: { type : new GraphQLNonNull(GraphQLString) },
                age : {type :new GraphQLNonNull(GraphQLInt)}                
            },
            resolve(parent, args) {
                let auth = new Author({
                    name: args.name,
                    age : args.age
                })
                return auth.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString )},
                genre: { type: new GraphQLNonNull(GraphQLString )},
                author_id : {type : new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    author_id : args.author_id
                })
                return book.save()
            }
        }
    }
}) 
/* 
addBook(name : "houssem",genre:"break",id:1 ){ 
	
}  
 */

/* {
books{
  name
  author {
    id
  } 
}
} */



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation : Mutation 
})