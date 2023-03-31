import { GetStaticPaths } from 'next';
import styled from 'styled-components';

const CategoryPage = () => {
    return (
        <Wrapper>
            준 비 중
        </Wrapper>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = ['/category/1', '/category/2', '/category/3'];
    return {
        paths,
        fallback: true,
    };
};

export async function getStaticProps({ params }: { params: { id: string; }; }) {
    return {
        props: {},
        revalidate: 86400,
    };
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    font-family: 'Noto Sans';
    font-size: 20px;
    gap: 20px;
`;

export default CategoryPage;

const ImageDom = styled.div`
    min-height: 200px;
    min-width: 300px;
    position: relative;
    display: flex;
    align-items: center;
`;