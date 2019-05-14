package com.itlize.ResourceApp.security;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtTokenProvider {
	
	@Value("${security.jwt.token.secret-key:secret}")
    private String secretKey = "secret";

    @Value("${security.jwt.token.expire-length:3600000}")
    private long validityInMilliseconds = 3600000; // 1h
    
    private String Issuer = "oath0";

	public String createTokenWithClaim(String username) {
		
		try {
			Algorithm algorithm = Algorithm.HMAC256(secretKey);
			Date nowDate = new Date();
//			Date expireDate = getAfterDate(nowDate, 0, 0, 0, 2, 0, 0);// 2小过期
			Date expireDate = new Date(nowDate.getTime() + validityInMilliseconds);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("alg", "HS256");
			map.put("typ", "JWT");
			String token = JWT.create()
					.withHeader(map)	// 设置头部信息 Heade
					.withClaim("username", username)	//设置 载荷 Payload
					.withIssuer(Issuer)	// 签名是有谁生成 例如 服务器
					.withSubject("Generating token")	// 签名的主题
					// .withNotBefore(new Date())//定义在什么时间之前，该jwt都是不可用的.
					.withAudience("ResourceApp")// 签名的观众 也可以理解谁接受签名的
					.withIssuedAt(nowDate) // 生成签名的时间
					.withExpiresAt(expireDate)// 签名过期的时间
					.sign(algorithm);	// 签名 Signature
			return token;
		} catch (JWTCreationException exception) {
			exception.printStackTrace();
		}
		return null;
	}

	public Date getAfterDate(Date date, int year, int month, int day, int hour, int minute, int second) {
		if (date == null) {
			date = new Date();
		}

		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		if (year != 0) {
			cal.add(Calendar.YEAR, year);
		}
		if (month != 0) {
			cal.add(Calendar.MONTH, month);
		}
		if (day != 0) {
			cal.add(Calendar.DATE, day);
		}
		if (hour != 0) {
			cal.add(Calendar.HOUR_OF_DAY, hour);
		}
		if (minute != 0) {
			cal.add(Calendar.MINUTE, minute);
		}
		if (second != 0) {
			cal.add(Calendar.SECOND, second);
		}
		return cal.getTime();
	}

	public void verifyToken(String token) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secretKey);
			JWTVerifier verifier = JWT.require(algorithm)
									.withIssuer(Issuer)
									.build(); // Reusable verifier instance
			DecodedJWT jwt = verifier.verify(token);
			String subject = jwt.getSubject();
			Map<String, Claim> claims = jwt.getClaims();
			Claim claim = claims.get("username");
			System.out.println(claim.asString());
			List<String> audience = jwt.getAudience();
			System.out.println(subject);
			System.out.println(audience.get(0));
		} catch (JWTVerificationException exception) {
			exception.printStackTrace();
		}
	}
	
}
