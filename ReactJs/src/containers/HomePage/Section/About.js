import React, { Component } from 'react';
import { connect } from 'react-redux';





class About extends Component {

   
    render() {
      
        return (
           <div className='section-share section-about'>
                <div className='section-about-header'>
                    Sức khỏe đời sống
                </div>
                <div className='section-about-content'>
                    <div className='section-left'>
                        <iframe width="100%" height="400px" 
                            src="https://www.youtube.com/embed/K6bTUoGe-Ig" 
                            title="9 cách giúp bạn sống khỏe sống khôn mỗi ngày Sức Khỏe Đời Sống" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen></iframe>
                    </div>
                    <div className='section-right'>
                        <p>Ai rồi cũng chết! là một tuyệt phẩm đánh động lòng người được viết nên bởi bác sĩ kiêm tác giả best-seller Atul Gawande. Cuốn sách không chỉ có khả năng lay chuyển ngành y học hiện đại, mà nó còn sẽ giúp làm biến đổi hoàn toàn cuộc sống của muôn người - bao gồm chính bạn!
                            Ngành y học thế giới đã có nhiều bước phát triển vượt bậc trong những năm qua: giảm thiểu tỉ lệ tử vong trẻ sơ sinh, nâng cao tỉ lệ sống sót sau chấn thương, chữa trị và kiểm soát được nhiều loại bệnh tật - kể cả nhiều căn bệnh từng được xem là không có thuốc chữa trong quá khứ. Nhưng dù có bành trướng hùng mạnh đến đâu, y học vẫn muôn đời bất lực trước quy luật sinh-lão-bệnh-tử bất biến của con người: Mỗi khi con người phải đối diện với Tuổi Già và Cái Chết, những công cụ y học vốn dĩ quyền năng bỗng chốc phản bội lại chính lý tưởng cứu nhân độ thế mà chúng đang phục vụ.</p>
                    </div>
            </div>
              
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language : state.app.language,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
