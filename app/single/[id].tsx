import apiClient from '@/api/apiClient';
import Typo from '@/components/Typo';
import BackButton from '@/components/backButton';
import Header from '@/components/header';
import ModalWrapper from '@/components/modalWrapper';
import Skeleton from '@/components/skeleton';
import { useTheme } from '@/context/ThemeContext';
import styles from '@/styles/single.styles';
import { spacingX, spacingY } from '@/types/theme';
import { PostType } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    View,
} from 'react-native';
import RenderHTML, {
    CustomRenderer,
    defaultHTMLElementModels,
    HTMLContentModel,
    TBlock,
    TDefaultRendererProps,
} from 'react-native-render-html';
import { WebView } from 'react-native-webview';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Single = () => {
    const { theme } = useTheme();
    const { id } = useLocalSearchParams();

    const [post, setPost] = useState<PostType>();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            setErrorMessage('');
            const res = await apiClient.get(`/wp-json/wp/v2/posts/${id}?_embed`);
            setPost(res.data);
        } catch (e: any) {
            setErrorMessage('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const imageUrl =
        post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
        'https://via.placeholder.com/300';

    const cleanHTML = (html: string) => {
        return html
            .replace(/<div id="ez-toc-container"[\s\S]*?<\/nav><\/div>/, '') // Remove TOC
            .replace(/<svg[\s\S]*?<\/svg>/g, '') // Optional: remove inline SVGs
            .trim();
    };

    const contentHTML = post?.content?.rendered
        ? cleanHTML(post.content.rendered)
        : '';

    const iframeRenderer: CustomRenderer<TBlock> = ({
        tnode,
    }: TDefaultRendererProps<TBlock>) => {
        const src = tnode.attributes.src;
        if (!src) return null;

        // const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');

        // if (isYouTube) {
        //     return (
        //         <Button
        //             style={{ backgroundColor: theme.colors.accent, marginVertical: 10 }}
        //             onPress={() => Linking.openURL(src)}
        //         >
        //             <Typo>
        //                 🎥 Watch on YouTube
        //             </Typo>
        //         </Button>
        //     );
        // }

        return (
            <WebView
                source={{ uri: src }}
                style={{ height: 300, width: '100%', marginVertical: 10 }}
                javaScriptEnabled
                domStorageEnabled
            />
        );
    };

    const customHTMLElementModels = {
        iframe: defaultHTMLElementModels.iframe.extend({
            contentModel: HTMLContentModel.block,
        }),
        img: defaultHTMLElementModels.img.extend({
            contentModel: HTMLContentModel.block,
        }),
    };

    const imgRenderer: CustomRenderer<TBlock> = ({
        tnode,
    }: TDefaultRendererProps<TBlock>) => {
        const src = tnode.attributes.src;
        const alt = tnode.attributes.alt || '';

        if (!src) return null;
        return (
            <Image
                source={{ uri: src }}
                style={styles.img}
                resizeMode="cover"
                accessibilityLabel={alt}
            />
        );
    };

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title=""
                    leftIcon={<BackButton />}
                    style={{ marginBottom: spacingY._10 }}
                />

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {loading ? (
                        <>
                            <Skeleton height={SCREEN_WIDTH * 0.77} radius={12} />
                            <Skeleton height={spacingX._40} radius={12} />
                            <Skeleton height={spacingX._40} radius={12} width={spacingY._150}/>
                            <Skeleton height={spacingX._25} radius={12} />
                            <Skeleton height={spacingX._25} radius={12} />
                            <Skeleton height={spacingX._25} radius={12} />
                            <Skeleton height={spacingX._25} radius={12} />
                            <Skeleton height={spacingX._25} radius={12} />
                            <Skeleton height={spacingX._25} radius={12} width={spacingY._150}/>
                        </>
                    ) : (
                        <>
                            <Image
                                source={{ uri: imageUrl }}
                                style={styles.img}
                                resizeMode="cover"
                            />
                            <Typo style={styles.title}>{post?.title.rendered}</Typo>

                            <RenderHTML
                                contentWidth={SCREEN_WIDTH}
                                source={{ html: contentHTML }}
                                tagsStyles={{
                                    p: { fontSize: 16, lineHeight: 24, color: theme.colors.textSecondary },
                                    h2: {
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        marginVertical: 10,
                                        color: theme.colors.textPrimary,
                                    },
                                    h3: {
                                        fontSize: 18,
                                        fontWeight: '600',
                                        marginVertical: 8,
                                        color: theme.colors.textPrimary,
                                    },
                                    h4: {
                                        color: theme.colors.textPrimary,
                                        fontSize: 16,
                                        fontWeight: '600',
                                        marginVertical: 10,
                                    },

                                    a: {
                                        color: theme.colors.accent,
                                        textDecorationLine: 'underline',
                                    },
                                    ul: { paddingLeft: 20, marginVertical: 8 },
                                    li: { color: theme.colors.textSecondary, fontSize: 16, lineHeight: 24 },
                                }}
                                enableExperimentalMarginCollapsing
                                renderersProps={{
                                    a: {
                                        onPress: (_, href: string) => Linking.openURL(href),
                                    },
                                }}
                                renderers={{
                                    iframe: iframeRenderer,
                                    img: imgRenderer,
                                }}
                                customHTMLElementModels={customHTMLElementModels}
                                ignoredDomTags={['svg']}
                            />
                        </>
                    )}

                    {errorMessage ? (
                        <Typo style={styles.errorText}>{errorMessage}</Typo>
                    ) : null}
                </ScrollView>
            </View>
        </ModalWrapper>
    );
};

export default Single;