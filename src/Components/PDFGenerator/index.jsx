import React from 'react';
import { Document, Page, Text, View, PDFViewer, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
import useFetch  from '../../Hooks/useFetch';
import { useSelector } from 'react-redux';


Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});


const styles = StyleSheet.create({


  
  wrapper: {
    padding: '10px',
    fontFamily: 'Roboto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
   // Відступ між рядками
  },
  image: {
    width: '30%', // Ширина фото (змініть за потребою)
    marginRight: '5px', // Відступ між фото і текстом
  },
  text: {
    width: '70%',
    fontSize: 12,
    // Ширина тексту (змініть за потребою)
  },
  w100: {
    width: '100%',
    fontSize: 10,
  },

  mb3: {
    marginBottom: '2px'
  },

  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  mr5: {
    marginRight: '5px'
  },

  fs12: {
    fontSize: '12px'
  },

  mb10: {
    marginBottom: '10px'
  },
  

  image32: {
    width: '45px',
    height: '45px',

  },

  logo: {
    marginBottom: '20px',
    width: '32px',
  },

  logoWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  initial: {
    fontSize: 12,
    lineHeight: '120%',
    marginBottom: '2px',
  },

  mt10: {
    marginTop: '10px',
  },

  modulesWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
    flexWrap: 'wrap',
    gap: '8px',
    marginTop:5,
    marginBottom: 12,
  },

  moduleImage: {
    width: '100%',
    maxHeight: '110px',
    objectFit: 'cover'
  },

  bd: {
    border: '1px solid #c5c5c5',
    padding: '3px',
    width: '100%',
    flex: '0 1 30%'
  },

  mb5: {
    marginBottom: 5
  },

});

function PDFGenerator({ products,totalPrice,promocodePercent,type }) {

	const languageInformation = useSelector(state => state.language.language);

  const { data: text, loading: loadingText, error: errorText } = useFetch(`${process.env.REACT_APP_API_URL}/Text-for-pdfs?locale=${languageInformation.language}&populate=*`);

  return (
    <div>
      <PDFDownloadLink
        document={<MyDocument 
          products={products}
          totalPrice={totalPrice}
          promocodePercent={promocodePercent}
          text={text}
          type={type}
           />}
        fileName="shadeko.pdf"
        style={{
          textDecoration: 'none',
          marginBottom: '5px',
          fontSize: '20px'

        }}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading...' : 'Завантажити іформацію про замовлення в PDF'
        }
      </PDFDownloadLink>

      <PDFViewer width="0px" height="0px">

        <MyDocument 
        products={products}
        totalPrice={totalPrice}
        promocodePercent={promocodePercent}
        text={text}
        type={type}
         />
         
      </PDFViewer>
    </div>
  );
}

const MyDocument = ({ products,totalPrice,promocodePercent,text,type }) => (



  text &&
  <Document>
    <Page size="A4" style={styles.wrapper}>

    <View style={[styles.logoWrapper]}>
       <Image style={styles.logo} src={process.env.PUBLIC_URL + '/img/header__logo-short.png'} />
    </View>

    <Text style={styles.initial}>{text[0]?.attributes?.initialText1}</Text>
    <Text style={styles.initial}>{text[0]?.attributes?.initialText2}</Text>
    <Text style={styles.initial}>{text[0]?.attributes?.initialText3}</Text>
    <Text style={styles.initial}>{text[0]?.attributes?.initialText4}</Text>
    <Text style={styles.initial}>{text[0]?.attributes?.initialText5}</Text>
    <Text style={styles.initial}>{text[0]?.attributes?.initialText6}</Text>
    <Text style={styles.initial}>{text[0]?.attributes?.initialText7}</Text>
    <Text style={styles.initial}>{text[0]?.attributes?.initialText8}</Text> 






    <View style={[styles.w100,styles.flex,styles.fs12, styles.mt10]}>
          <Text style={styles.mr5}>{text[0]?.attributes?.allPriceOrder}</Text>
          <Text>{totalPrice}$</Text>
     </View>

    <View style={[styles.w100,styles.flex,styles.fs12]}>
           <Text style={styles.mr5}>{text[0]?.attributes?.promocode}</Text>
           <Text>{promocodePercent}%</Text>
    </View>  

    <View style={[styles.w100,styles.flex,styles.fs12,styles.mb10]}>
          <Text style={styles.mr5}>{text[0]?.attributes?.typeOrder}</Text>

          {
            type == 'Not paid' ? 
            <Text>{text[0]?.attributes?.typeOrderOption1}</Text>
            :
            <Text>{text[0]?.attributes?.typeOrderOption2}</Text>
          }
          
    </View>  



      {products?.map((item, index) => (
        <>
        <View key={index} style={styles.row}>
          <Image style={styles.image} src={process.env.REACT_APP_IMG + item?.img} />
          <View style={styles.text}>

            <View style={[styles.w100, styles.mb3]}>
              <Text>{item.title}</Text>
            </View>

            <View style={[styles.w100,styles.flex,styles.mb3]}>
              <Text style={styles.mr5}>{text[0]?.attributes?.Quantity}</Text>
              <Text>{item.quantity}</Text>
            </View>




            <View style={[styles.w100,styles.flex]}>
            {
    item?.color?.name && 

    <View style={[styles.w100,styles.flex,styles.mb3]}>
        <Text style={styles.mr5}>{text[0]?.attributes?.Color}</Text>
        <Text>{item?.color?.name}</Text>       
       

    </View>

}
           
{
    item?.material?.name && 
        <View style={[styles.w100,styles.flex,styles.mb3]}>
            <Text style={styles.mr5}>{text[0]?.attributes?.Material}</Text>
            <Text>{item?.material?.name}</Text>
        </View>
}
            </View>


            {
    item?.quantity !== 1 &&

            <View style={[styles.w100,styles.flex,styles.mb3]}>
                <Text  style={styles.mr5}>{text[0]?.attributes?.priceSingle}</Text>
                <Text>{item?.price}$</Text>
                <Text>{item?.stockQuantity === '0' && +item?.price / 2 }$</Text>
            </View>
}

            


            <View style={[styles.w100,styles.flex,styles.mb3]}>
                <Text  style={styles.mr5}>{text[0]?.attributes?.allPriceSingle}</Text>
                <Text>{+item?.quantity * +item?.price}$</Text>
                {/* <span>{item?.stockQuantity === '0' && +item?.price / 2+'$' }</span> */}
            </View>


        {
            item?.configurations.map((configuration)=>(
                <View key={'configurationOrder'+configuration.id} style={[styles.w100,styles.flex,styles.mb3]}>
                    <Text style={styles.mr5}>{configuration.title}</Text>
                    <Text>{configuration.value}</Text>
                </View>
            ))
        }



          </View>
        </View>


        <View style={styles.modulesWrapper}>

        {
        item?.modules?.map((el)=>(

          <View style={styles.bd}>
            <Text>{el.title}</Text>

            <View style={styles.row}>
              <Text style={styles.mr5}>{text[0]?.attributes?.Quantity}</Text>
              <Text>{el.quantity}</Text>  
            </View>

             <View style={styles.row}>
              <Text style={styles.mr5}>{text[0]?.attributes?.allPriceSingle}</Text>
              <Text style={styles.mb5}>{el.quantity * el.price}$</Text>  
            </View>
            <Image style={styles.moduleImage} src={el?.img} />    
             </View>
        ))
        }

        </View>

       
        </>
      ))}
      
    </Page>
  </Document>
);

export default PDFGenerator;
