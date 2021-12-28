import React, { useCallback, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { client } from '../index';

export function FetchData() {

    // const mutation = gql`
    // mutation ($id: ID!) {
    //     AddProductCart(id: $id) {
    //         id, title, description, price, category, gender, sizes
    //   }
    // }`;

    // const query = gql`query qu1{
    //     UserProductsCart{
    //         id, title, price, category, gender, sizes
    //     }
    // }`;

    // const [myMutation] = useMutation(mutation);
    // const runningQuery = useQuery(query);
    // const [isSending, setIsSending] = useState(false);
    // // const [newBookName, setNewBookName] = useState('');
    // const [authorFromMutation, setAuthorFromMutation] = useState(null);
    // const sendRequest = useCallback(async (trgId) => {
    //   if (isSending) return;
    //   setIsSending(true);
    //   let result = await myMutation({ variables: { id: trgId } });
    //   setIsSending(false);
    //   setAuthorFromMutation(result.data.AddProductCart);
    // }, [isSending]);
    // let author = authorFromMutation || (runningQuery.data && runningQuery.data.UserProductsCart);
  
    // return !author
    //   ? <div>loading...</div>
    //   : <div>
    //     {author.map(ct => 
    //     <>
    //         Data: {ct.id}-{ct.gender}
    //         <p>{ct.selected}</p>
    //     </>
    //     )}
    return (
        <input type="button" onClick={() => {
            client.mutate({
                variables: { id: 3 },
                mutation: gql`
                  mutation AddProductCart($id: ID!){
                    AddProductCart(id: $id) {
                        id, title, description, price, category, gender, sizes
                    }
                  }
                `,
                
              })
              .then(result => { console.log(result) })
              .catch(error => { console.log(error) });
        }} value="Add Cart" />
    )
}
export default FetchData
