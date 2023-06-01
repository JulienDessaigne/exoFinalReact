import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Linking
} from 'react-native';



function GetCharacter(props) {
    const ListItem = ({ label, value }) => {
        if (label === 'profile_url') {
            return (
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontWeight: 'bold', marginRight: 5, color: 'white' }}>{formatLabel(label)}:</Text>
                    <Text style={{ color: 'white', textDecorationLine: 'underline' }} onPress={() => Linking.openURL(value)}>{value}</Text>
                </View>
            );
        }

        return (
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 5, color: 'white' }}>{formatLabel(label)}:</Text>
                <Text style={{ color: 'white' }}>{value}</Text>
            </View>
        );
    };
    const formatLabel = (label) => {
        // Formater le label avec une majuscule au début du mot
        return label.charAt(0).toUpperCase() + label.slice(1);
    };

    const [isLoaded, setLoaded] = useState(false);
    const [characterData, setCharacterData] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState("")
    const [error, setError] = useState(false)
    let getCharacterInformation = async () => {
        const url = `https://raider-io.p.rapidapi.com/api/v1/characters/profile?region=eu&realm=${props.server}&fields=mythic_plus_scores_by_season%3Acurrent&name=${props.characterName}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '10e772ebefmsh6f93ee6600a11c1p10a8fbjsn51badc3aeda9',
                'X-RapidAPI-Host': 'raider-io.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            setLoaded(true);
            const data = JSON.parse(result)
            if(data.error) {
                throw new Error('Exception volontaire');
            }

            setThumbnailUrl(data.thumbnail_url)
            data.mythic_plus_score = data.mythic_plus_scores_by_season[0].segments.all.score

            delete data.thumbnail_url
            delete data.mythic_plus_scores_by_season
            delete data.last_crawled_at
            delete data.profile_banner
            delete data.honorable_kills

            setCharacterData(data)
        } catch (error) {
            setError(true)
            setLoaded(true);
        }

    }

    if (!isLoaded) {
        getCharacterInformation();
    }

    if (!characterData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    if(error) {
        return (
            <View style={styles.container}>
                <Text>Aucune information</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: thumbnailUrl }}
                style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 20, marginTop: 20 }}
            />
            {<FlatList
                data={Object.entries(characterData)}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => <ListItem label={item[0]} value={item[1]} />}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#16325c',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30
    }
});

export default GetCharacter;